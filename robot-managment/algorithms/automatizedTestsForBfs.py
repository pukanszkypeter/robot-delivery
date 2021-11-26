import math
import random



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
    for i in range(numberOfTest):
        chooseStartNode = random.randint(1, math.ceil(numberOfNode*0.2))
        chooseEndNode = random.randint(1 + math.ceil(numberOfNode*0.2), numberOfNode)

        print(chooseStartNode)
        print(chooseEndNode)
        result = bfs_steps(tree, chooseStartNode, chooseEndNode)
        print(result)
        if result != None:
            print("Felső korlát: " + str(edgeNumber + numberOfNode) + " Steps:" + str(len(result)))

