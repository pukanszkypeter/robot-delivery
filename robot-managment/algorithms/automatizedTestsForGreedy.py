from greedy import *
import random
import math
import numpy
import sqlite3

class Result:
    def __init__(self, robotsNumber, steps):
        self.robotsNumber = robotsNumber
        self.steps = steps

def generateNodes(numberOfNodes):
    nodes = []

    for i in range(1, numberOfNodes + 1):
        nodes.append(Node(i))
    return nodes

def generateEdges(numberOfNodes):
    edges = []
    for i in range(1, numberOfNodes):
        weight = math.ceil(random.randint(1, numberOfNodes)*0.6)
        edges.append(Edge(i, i+1, weight))
    return edges

def generateAgents(k, budgetMax, numberOfNodes):
    agents = []
    for i in range(1, k+1):
        budget = random.randint(1, budgetMax)*5 # fontos hogy 5nel nagyobb legyen vagy nem tudjak rendesen lefedni
        startNode = random.randint(1, numberOfNodes+1)
        agents.append(Agent(i, startNode, budget))

    return agents

def calculateResult(interval, numberOfNodes):
    valueses = list(interval.values())
    if len(valueses) != 0:
        lastValue = valueses[len(valueses) - 1]
        lastNodeId = lastValue[1]
        if lastNodeId != numberOfNodes:
            return None
        else:
            return len(list(interval.keys()))
    else:
        return None


def runTests(numberOfTests, numberOfNodes):
    nodes = generateNodes(numberOfNodes)
    edges = generateEdges(numberOfNodes)

    results = []
    for i in range(numberOfTests):
        k = math.ceil(random.randint(1, numberOfNodes))
        agents = generateAgents(k, numberOfNodes, numberOfNodes)

        greedyModel = GreedyModel(nodes, edges, agents)
        greedyModel.initAgents()
        steps = calculateResult(greedyModel.greedy(), numberOfNodes)
        if steps is not None:
            results.append(Result(k, steps))
    return results


def saveTestResults(finalResults):
    connection = sqlite3.connect("../data/memory.sqlite" , detect_types = sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
    cursor = connection.cursor()


    sql_insert_query = """insert into delivery_measurement
            (k, ceiling, steps) values (?, ?, ?)"""

    for i in finalResults:
        cursor.execute(sql_insert_query, (i.robotsNumber, math.ceil(numpy.log(int(i.robotsNumber)) * int(i.robotsNumber)), i.steps))
        inserted_id = cursor.lastrowid
        connection.commit()

    cursor.close()
finalResults = runTests(100,20)

saveTestResults(finalResults)

for i in finalResults:
    print("Robot umber: " + str(i.robotsNumber) + " Felső korlát k * log(k): " + str(math.ceil(numpy.log(int(i.robotsNumber)) * int(i.robotsNumber))) + " Steps: " + str(i.steps)) #szor 3 mivel step 1, el megy érte, step 2 el viszi, vissza megy step 3 és amúgy így hülyeség az egész enélkül

