# Node class
class Node:
    def __init__(self, id):
        self.id = id

# Edge class
class Edge:
    def __init__(self, fromID, toID, weight):
        self.fromID = fromID
        self.toID = toID
        self.weight = weight

# Agent class
class Agent:
    def __init__(self, id, startNode, budget):
        self.id = id
        self.startNode = startNode
        self.budget = budget
        self.leftMost = startNode
        self.rightMost = startNode
        self.used = False

    def setLeftMost(self, leftMost):
        self.leftMost = leftMost
    
    def setRightMost(self, rightMost):
        self.rightMost = rightMost

# Model for greedy
class GreedyModel:
    def __init__(self, nodes, edges, agents):
        self.nodes = nodes
        self.edges = edges
        self.agents = agents
        self.steps = 0

    # Calculate left most and right most accessible points
    def initAgents(self):
        for agent in self.agents:
            leftPath = list(map(lambda x: x.id, filter(lambda x: x.id <= agent.startNode,self.nodes)))
            rightPath = list(map(lambda x: x.id, filter(lambda x: x.id >= agent.startNode,self.nodes)))

            limit = agent.budget / 2

            counter = 0
            for l in reversed(leftPath):
                edge = list(filter(lambda x: x.toID == l, self.edges))
                if len(edge) == 1:
                    counter += edge[0].weight
                    if counter <= limit:
                        agent.setLeftMost(edge[0].fromID)
            
            counter = 0
            for r in rightPath:
                edge = list(filter(lambda x: x.fromID == r, self.edges))
                if len(edge) == 1:
                    counter += edge[0].weight
                    if counter <= limit:
                        agent.setRightMost(edge[0].toID)

    def greedy(self):
        s = self.nodes[0].id # start point
        t = self.nodes[len(self.nodes)-1].id # end point
        intervals = {}
        
        r = 1
        while r != 0:
            if s >= t: # we reached the destination
                return intervals

            # filtering not used agents within the package interval
            agents = list(filter(lambda x: (x.used == False) and (x.leftMost <= s < x.rightMost), self.agents))
            if len(agents) > 0:
                
                delivery = min(agents, key=lambda x: x.rightMost) # nearest agent
                temp = s
                s = min(delivery.rightMost, self.accessible(s, delivery.budget / 2)) # delivery with limit
                intervals[delivery.id] = [temp, s]
                delivery.used = True
                r += 1

            else:
                return intervals

    # calculates the next accessible node with given limit
    def accessible(self, nodeID, limit):
        path = list(map(lambda x: x.id, filter(lambda x: x.id >= nodeID, self.nodes)))

        accessible = nodeID
        counter = 0
        for p in path:
            edge = list(filter(lambda x: x.fromID == p, self.edges))
            if len(edge) == 1:
                counter += edge[0].weight
                if counter <= limit:
                    accessible = edge[0].toID
        
        return accessible


'''

node_1 = Node(1)
node_2 = Node(2)
node_3 = Node(3)
node_4 = Node(4)
node_5 = Node(5)
node_6 = Node(6)

nodes = []
nodes.append(node_1)
nodes.append(node_2)
nodes.append(node_3)
nodes.append(node_4)
nodes.append(node_5)
nodes.append(node_6)


edge_1_2 = Edge(1, 2, 2)
edge_2_3 = Edge(2, 3, 2)
edge_3_4 = Edge(3, 4, 2)
edge_4_5 = Edge(4, 5, 2)
edge_5_6 = Edge(5, 6, 2)

edges = []
edges.append(edge_1_2)
edges.append(edge_2_3)
edges.append(edge_3_4)
edges.append(edge_4_5)
edges.append(edge_5_6)

agent_1 = Agent(1, 2, 10)
agent_2 = Agent(2, 2, 10)
agent_3 = Agent(3, 2, 10)
agent_4 = Agent(4, 2, 10)

agents = []
agents.append(agent_1)
agents.append(agent_2)
agents.append(agent_3)


def calculateResult(interval, numberOfNodes):
    valueses = list(interval.values())
    print(valueses)

    lastValue = valueses[len(valueses) - 1]
    print(lastValue)
    lastNodeId = lastValue[1]
    print(lastNodeId)
    if lastNodeId != numberOfNodes:
        return None
    else:
        return len(list(interval.keys()))
   

greedyModel = GreedyModel(nodes, edges, agents)
greedyModel.initAgents()
calculateResult(greedyModel.greedy(), 6)

'''
