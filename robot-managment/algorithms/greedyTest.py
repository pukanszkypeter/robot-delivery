from algorithms.greedy import *
import random, math, numpy, sqlite3

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
    for i in range(1, k + 1):
        budget = random.randint(1, budgetMax) * 5 # must be greater then 5 or doesn't give a solution
        startNode = random.randint(1, numberOfNodes + 1)
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
    connection = sqlite3.connect("data/memory.sqlite" , detect_types = sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
    cursor = connection.cursor()

    sql_insert_query = """insert into greedy_measurement (k, ceiling, steps) values (?, ?, ?)"""

    for i in finalResults:
        print("Robot number: " + str(i.robotsNumber) + " - " + "Ceiling(k * log(k)): " + str(math.ceil(numpy.log(int(i.robotsNumber)) * int(i.robotsNumber))) + " - " + " Steps: " + str(i.steps))
        cursor.execute(sql_insert_query, (i.robotsNumber, math.ceil(numpy.log(int(i.robotsNumber)) * int(i.robotsNumber)), i.steps))
        inserted_id = cursor.lastrowid
        connection.commit()

    cursor.close()
    return True
