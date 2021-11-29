import math, random, sqlite3
from algorithms.bfs import bfs_steps, getNumberOfNodes


# n = nodes.count + edges.count
# just count the steps and add the node count and the edge count

def runTest(numberOfTest, tree):
    connection = sqlite3.connect("data/memory.sqlite" , detect_types = sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
    cursor = connection.cursor()

    sql_insert_query = """insert into bfs_measurement (ceiling, steps) values (?, ?)"""

    numberOfNode = getNumberOfNodes(tree)

    for i in range(numberOfTest):
        startNode = random.randint(1, math.ceil(numberOfNode * 0.2))
        endNode = random.randint(1 + math.ceil(numberOfNode * 0.5), numberOfNode)

        print("Start node: " + str(startNode))
        print("End node: " + str(endNode))
        result = bfs_steps(tree, startNode, endNode)
        print("BFS result: " + str(result))

        if result != None:
            inserted_id = cursor.lastrowid
            connection.execute(sql_insert_query, (numberOfNode, len(result)))
            connection.commit()
            print("Ceiling: " + str(numberOfNode) + " - " + "Steps: " + str(len(result)))
    
    cursor.close()
    return True

