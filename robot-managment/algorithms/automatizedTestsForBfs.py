import math
import random
import sqlite3



def bfs_steps(tree, start, end):
    queue = []
    queue.append([start])
    steps = []
    while queue:
        path = queue.pop(0)
        node = path[-1]
        steps.append(path)
        if node == end:
            return steps
        for adjacent in tree.get(node, []):
            new_path = list(path)
            new_path.append(adjacent)
            queue.append(new_path)


# n = nodes.count + edges.count

#just count the steps and add the node count and the edge count
def runTest(numberOfTest, tree, edgeNumber, numberOfNode):
    connection = sqlite3.connect("data/memory.sqlite" , detect_types = sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
    cursor = connection.cursor()

    sql_insert_query = """insert into bfs_measurement
            (ceiling, steps) values (?, ?)"""

    for i in range(numberOfTest):
        chooseStartNode = random.randint(1, math.ceil(numberOfNode*0.2))
        chooseEndNode = random.randint(1 + math.ceil(numberOfNode*0.5), numberOfNode)

        print("Start")
        print(chooseStartNode)
        print("End")
        print(chooseEndNode)

        result = bfs_steps(tree, chooseStartNode, chooseEndNode)
        print(result)
        if result != None:
            inserted_id = cursor.lastrowid
            connection.commit()
            print("Ceiling: " + str(numberOfNode) + " Steps:" + str(len(result)))
    cursor.close()

