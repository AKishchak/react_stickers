import * as React from "react";
import PendulumController from "./Pendulum.controller";
import styled from "styled-components";
import {ChangeEvent} from "react";
import { Slider } from '@material-ui/lab';
import { withStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography/Typography";

const CanvasWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const styles = {
    root: {
        width: 300,
        height: '40px',
    },
    // slider: {
    //     padding: '22px 0px',
    // },
    // thumbIcon: {
    //     borderRadius: '50%',
    // },
    // thumbIconWrapper: {
    //     backgroundColor: '#fff',
    // },
};

const StyledSlider = withStyles(styles)(Slider);

export interface IPendulumState {
    arm1: number,
    arm2: number,
    mass1: number,
    mass2: number,
}

export default class Pendulum extends React.Component<any, IPendulumState> {

    public canvas: HTMLCanvasElement | null;
    private pendulum: PendulumController;

    constructor(props: any){
        super(props);
        this.pendulum = new PendulumController();
        this.state = {
            arm1: this.pendulum.Arm1,
            arm2: this.pendulum.Arm2,
            mass1: this.pendulum.Mass1,
            mass2: this.pendulum.Mass2,
        };

        this.updateArm1 = this.updateArm1.bind(this);
        this.updateArm2 = this.updateArm2.bind(this);
        this.updateMass1 = this.updateMass1.bind(this);
        this.updateMass2 = this.updateMass2.bind(this);
    }

    public componentDidMount(){
        if(this.canvas !== null) {
            const ctx: CanvasRenderingContext2D|null = this.canvas.getContext('2d');
            if(ctx){
                this.pendulum.setContext(ctx);
                this.pendulum.start();
            }
        }
    }

    public componentWillUpdate(nextProps: any, nextState: IPendulumState) {
        this.pendulum.applyConfig({
            arm1: nextState.arm1,
            arm2: nextState.arm2,
            mass1: nextState.mass1,
            mass2: nextState.mass2,
        });
    }

    public render(){
        return <CanvasWrapper>
            <div>
                <Typography>Arm 1</Typography>
                <StyledSlider
                    min={10}
                    max={300}
                    step={1}
                    value={this.state.arm1}
                    onChange={this.updateArm1}
                />
                <Typography>Arm 2</Typography>
                <StyledSlider
                    min={10}
                    max={300}
                    step={1}
                    value={this.state.arm2}
                    onChange={this.updateArm2}
                />
                <Typography>Mass 1</Typography>
                <StyledSlider
                    min={10}
                    max={300}
                    step={1}
                    value={this.state.mass1}
                    onChange={this.updateMass1}
                />
                <Typography>Mass 2</Typography>
                <StyledSlider
                    min={10}
                    max={300}
                    step={1}
                    value={this.state.mass2}
                    onChange={this.updateMass2}
                />
            </div>
            <canvas ref={r => { this.canvas = r }} width={900} height={700}/>
        </CanvasWrapper>
    }

    private updateArm1(e: ChangeEvent<{}>, value: number){
       this.setState({
           arm1: value
       })
    }

    private updateArm2(e: ChangeEvent<{}>, value: number){
        this.setState({
            arm2: value
        })
    }

    private updateMass1(e: ChangeEvent<{}>, value: number){
        this.setState({
            mass1: value
        })
    }

    private updateMass2(e: ChangeEvent<{}>, value: number){
        this.setState({
            mass2: value
        })
    }
}