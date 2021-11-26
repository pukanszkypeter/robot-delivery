import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TreeConfigurationComponent} from "./tree-configuration/tree-configuration.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as vis from 'vis-network';
import {DataSet} from "vis-data/peer/esm/vis-data";
import {BfsConfigurationComponent} from "./bfs-configuration/bfs-configuration.component";
import {AlgorithmService} from "../../services/server-side/algorithm.service";
import {RobotConfigurationComponent} from "./robot-configuration/robot-configuration.component";
import {VisService} from "../../services/client-side/vis.service";
import {BfsTestConfigurationComponent} from "./bfs-test-configuration/bfs-test-configuration.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  network: any;

  speed: number = 750;
  operators = false;

  STOPPED = false;

  showEnergy = false;
  selectedEnergy = 0;

  /// BFS
  BFS = false;
  runnableBFS = false;
  robotAvailable = false;
  bfsSteps: [number[]] = [[]];
  bfsIndex = 0;
  bfsTime = 0;

  bfsModel: {nodes: any[], edges: any[]};

  /// Greedy
  GREEDY = false;
  runnableGreedy = false;
  solutionAvailable = false;
  greedySteps: {robotID: number, from: number, to: number}[] = [];
  greedyIndex = 0;
  greedyTime = 0;

  greedyModel: {nodes: any[], edges: any[], agents: any[]};

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private algorithmService: AlgorithmService,
              private visService: VisService) { }

  ngOnInit(): void {
  }

  /** Configuration Dialogs */

  openTreeConfigurationDialog(): void {
    const dialogRef = this.dialog.open(TreeConfigurationComponent, { width: '30%',height: '40%', disableClose: true});

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.operators = false;
        this.openSnackBar('Successful saving!', 'success-snackbar');
        this.drawTree(res.level, res.child);
      }
    }, err => {
      console.log(err);
      this.openSnackBar('Failed to save!', 'error-snackbar');
    });
  }

  openTestConfigurationDialog(): void {
    const dialogRef = this.dialog.open(BfsTestConfigurationComponent, { width: '30%',height: '40%', disableClose: true});

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.operators = false;
        this.openSnackBar('Successful saving!', 'success-snackbar');
        let result = this.implementTree(res.level, res.child)
        this.algorithmService.runBFSTest(result.tree, result.edgeCount);
      }
    }, err => {
      console.log(err);
      this.openSnackBar('Failed to save!', 'error-snackbar');
    });
  }

  openRobotConfigurationDialog(): void {
    const dialogRef = this.dialog.open(RobotConfigurationComponent, {
      data: {path: this.bfsSteps[this.bfsSteps.length - 1]}, width: '30%', height: '50%', disableClose: true });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.operators = false;
        this.openSnackBar('Successful saving!', 'success-snackbar');
        this.drawPath(this.bfsSteps[this.bfsSteps.length - 1], res.location, res.budget, res.weight);
      }
    }, err => {
      console.log(err);
      this.openSnackBar('Failed to save!', 'error-snackbar');
    });
  }

  /** Test method */

  implementTree(level: number, child: number) {
    let tree = this.visService.generateTree(level, child);
    return {tree: tree, edgeCount: this.visService.calculateTreeEdgeNumber(tree)};
  }

  /** Vis.js */

  drawTree(level: number, child: number): void {
    const container = document.getElementById('vis-container');

    let treeData = this.visService.calculateTreeData(level, child);
    this.bfsModel = treeData.model;
    let data = {
      nodes: new DataSet(treeData.nodes),
      edges: new DataSet(treeData.edges)
    }

    let options = { layout: { hierarchical: { direction: 'UD' } } };

    if (container) {
      this.network = new vis.Network(container, data, options);
      this.runnableBFS = true;
    }
  }

  drawPath(path: number[], robots: number[], budget: number, weight: number): void {
    const container = document.getElementById('vis-container');

    let pathData = this.visService.calculatePathData(path, robots, budget, weight);
    this.greedyModel = pathData.model;
    let data = {
      nodes: new DataSet(pathData.nodes),
      edges: new DataSet(pathData.edges)
    }

    let options = { layout: { hierarchical: { direction: 'LR' } } };

    if (container) {
      this.network = new vis.Network(container, data, options);
      this.runnableGreedy = true;
    }

    this.network.on('click', (event: any) => {
      const node = event.nodes[0];
      const agent = this.greedyModel.agents.find(agent => agent.startNode === node);
      if (agent) {
        this.selectedEnergy = agent.budget;
        this.showEnergy = true;
      } else {
        this.showEnergy = false;
      }
    });
  }

  /** Operators */

  async playBFS(): Promise<void> {
    this.STOPPED = false;
    while (!this.robotAvailable && !this.STOPPED) {
      await this.step();
      await this.sleep(this.speed);
    }
  }

  async playGreedy(): Promise<void> {
    this.STOPPED = false;
    while (!this.solutionAvailable && !this.STOPPED) {
      await this.step();
      await this.sleep(this.speed);
    }
  }

  pause(): void {
    this.STOPPED = true;
  }

  async step(): Promise<void> {
    /** Case: BFS */
    if (this.BFS) {
      if (this.bfsSteps.length > this.bfsIndex) {
        await this.stepBFS();
        this.robotAvailable = false;
      } else {
        this.openSnackBar('BFS successfully found the path!', 'success-snackbar');
        this.robotAvailable = true;
      }
      /** Case: Greedy */
    } else if (this.GREEDY) {
      if (this.greedySteps.length > this.greedyIndex && this.greedySteps.length > 0) {
        await this.stepGreedy();
        this.solutionAvailable = false;
      } else {
        if (this.greedySteps.length > 0 && this.greedySteps[this.greedySteps.length - 1].to === this.greedyModel.nodes[this.greedyModel.nodes.length - 1].id) {
          this.openSnackBar('Covering problem solved! Solution found!', 'success-snackbar')
          this.solutionAvailable = true;
        } else {
          this.openSnackBar('No more steps available! No solution found!', 'error-snackbar')
          this.solutionAvailable = true;
        }
      }
    }
  }

  async back(): Promise<void> {
    if (this.BFS) {
      if (this.bfsIndex > 1) {
        await this.stepBFS(true);
        this.robotAvailable = false;
      }
    } else if (this.GREEDY) {
      if (this.greedyIndex > 0) {
        await this.stepGreedy(true);
        this.solutionAvailable = false;
      }
    }
  }

  /** Operation helpers */

  async stepBFS(back?: boolean): Promise<void> {
    if (back) {
      this.bfsIndex--;
    }

    let nodes = this.network.nodesHandler.body.data.nodes;

    if (this.bfsIndex !== 0) {
      let beforeSteps = this.bfsSteps[!back ? this.bfsIndex - 1 : this.bfsIndex];
      for (let i = 0; i < beforeSteps.length; i++) {
        nodes.update({id: beforeSteps[i], label: beforeSteps[i].toString(), color: '#ffffff'});
      }
    } else {
      nodes.update({id: 1, label: '1', color: '#ffffff'});
      const lastSteps = this.bfsSteps[this.bfsSteps.length-1];
      const last = lastSteps[lastSteps.length - 1];
      nodes.update({id: last, label: last.toString(), color: '#ffffff'});
    }

    let steps = this.bfsSteps[!back ? this.bfsIndex : this.bfsIndex - 1];
    for (let i = 0; i < steps.length; i++) {
      await this.sleep(this.speed);
      nodes.update({id: steps[i], label: steps[i].toString(), color: '#bf00ff'});
    }

    if (!back) {
      this.bfsIndex++;
    }
  }

  async stepGreedy(back?: boolean): Promise<void> {
    if (back) {
      await this.stepGreedyBack();
    } else if (!back) {
      await this.stepGreedyForward();
    }
  }

  async stepGreedyForward(): Promise<void> {
    const startNode = this.greedyModel.agents.find(agent => agent.id === this.greedySteps[this.greedyIndex].robotID).startNode;
    const from = this.greedySteps[this.greedyIndex].from;
    const to = this.greedySteps[this.greedyIndex].to;

    const interval = this.greedyModel.nodes.filter(node => from <= node.id && node.id <= to).map(node => node.id);
    const index = interval.indexOf(startNode);

    let steps = [];
    let dropOffIndex = 0;
    for (let i = index; i >= 0; i--) {
      steps.push(interval[i]);
    }
    for (let i = 1; i < interval.length - 1; i++) {
      steps.push(interval[i]);
    }
    for (let i = interval.length - 1; i >= index; i--) {
      if (i === interval.length - 1) {
        dropOffIndex = steps.push(interval[i]) - 1;
      } else {
        steps.push(interval[i]);
      }
    }

    let nodes = this.network.nodesHandler.body.data.nodes;

    for (let i = 0; i < steps.length; i++) {
      if (i == 0) {
        nodes.update({id: steps[i], label: steps[i].toString(), color: '#ffffff', shape: null, image: null});
      } else {
        if (i > 1) {
          nodes.update({id: steps[i - 1], label: steps[i - 1].toString(), color: '#ffffff', shape: null, image: null});
        }
        nodes.update({id: steps[i], label: steps[i].toString(), color: '#bf00ff', shape: 'circularImage', image: '../../../assets/icons/robot-icon.svg'});
        if (i === (dropOffIndex + 1)) {
          nodes.update({id: to, label: to.toString(), color: '#ffa31a'});
          await this.sleep(this.speed);
        }
      }
      await this.sleep(this.speed);
    }
    this.greedyIndex++;
  }

  async stepGreedyBack(): Promise<void> {
    this.greedyIndex--;
    const startNode = this.greedyModel.agents.find(agent => agent.id === this.greedySteps[this.greedyIndex].robotID).startNode;
    const from = this.greedySteps[this.greedyIndex].from;
    const to = this.greedySteps[this.greedyIndex].to;

    const interval = this.greedyModel.nodes.filter(node => from <= node.id && node.id <= to).map(node => node.id);
    const index = interval.indexOf(startNode);

    let steps = [];
    let pickUpIndex = 0;
    for (let i = index; i <= interval.length - 1; i++) {
      steps.push(interval[i]);
    }
    for (let i = interval.length - 2; i > 0; i--) {
      steps.push(interval[i]);
    }
    for (let i = 0; i <= index; i++) {
      if (i === 0) {
        pickUpIndex = steps.push(interval[i]) - 1;
      } else {
        steps.push(interval[i]);
      }
    }

    let nodes = this.network.nodesHandler.body.data.nodes;

    for (let i = 0; i < steps.length; i++) {
      if (i == 0) {
        nodes.update({id: steps[i], label: steps[i].toString(), color: '#ffffff', shape: null, image: null});
      } else {
        if (i > 1) {
          nodes.update({id: steps[i - 1], label: steps[i - 1].toString(), color: '#ffffff', shape: null, image: null});
        }
        nodes.update({id: steps[i], label: steps[i].toString(), color: '#bf00ff', shape: 'circularImage', image: '../../../assets/icons/robot-icon.svg'});
        if (i === (pickUpIndex + 1)) {
          nodes.update({id: from, label: from.toString(), color: '#ffa31a'});
          await this.sleep(this.speed);
        }
      }
      await this.sleep(this.speed);
    }
  }

  /** Algorithms on server */

  runBFS(): void {
    const dialogRef = this.dialog.open(BfsConfigurationComponent, {
      data: {destinationOptions: this.getDestinationOptions(this.bfsModel)}, width: '20%', height: '30%', disableClose: true });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.runnableBFS = false;
        this.BFS = true;
        this.operators = true;
        this.network.nodesHandler.body.data.nodes.update({id: res.destination, label: res.destination.toString(), color: '#bf00ff'});
        const startTime = new Date();
        this.algorithmService.runBFS(this.bfsModel, 1, res.destination).subscribe(res => {
          const endTime = new Date();
          this.bfsTime =  endTime.valueOf() - startTime.valueOf();
          this.bfsSteps = res;
        }, err => {
          console.log(err);
        });
      }
    });
  }

  runGreedy(): void {
    const startTime = new Date();
    this.algorithmService.runGreedy(this.greedyModel).subscribe(res => {
      const endTime = new Date();
      this.greedyTime = endTime.valueOf() - startTime.valueOf();
      this.runnableGreedy = false;
      this.GREEDY = true;
      this.BFS = false;
      this.operators = true;
      for (const key in res) {
        this.greedySteps.push({robotID: Number(key), from: res[key][0], to: res[key][1]});
      }
    }, err => {
      console.log(err);
    });
  }

  /** Helper Methods */

  getDestinationOptions(tree: any): number[] {
    let options = [];

    for (let i = 1; i < tree.length; i++) {
      for (let [key, value] of tree[i]) {
        options.push(key);
      }
    }

    return options;
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openSnackBar(text: string, style: string): void {
    this._snackBar.open(text, undefined, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2500,
      panelClass: [style]
    });
  }

}
