import Timeout = NodeJS.Timeout;

const G = 1;

export interface IPendulumConfig {
    arm1?: number;
    arm2?: number;
    mass1?: number;
    mass2?: number;
}

export default class PendulumController {
    private context: CanvasRenderingContext2D;

    private r1: number;
    private r2: number;
    private a1: number;
    private a2: number;
    private m1: number;
    private m2: number;
    private v1: number;
    private v2: number;

    public get Arm1() : number {
        return this.r1;
    }

    public get Arm2() : number {
        return this.r2;
    }

    public get Mass1() : number {
        return this.m1;
    }

    public get Mass2() : number {
        return this.m2;
    }

    private interval: Timeout;

    get width() : number {
        return this.context.canvas.width;
    }

    get height() : number {
        return this.context.canvas.height;
    }

    public constructor(){
        this.r1 = 200;
        this.r2 = 150;
        this.a1 = Math.PI * 2;
        this.a2 = Math.PI - 0.1;
        this.v1 = 0;
        this.v2 = 0;
        this.m1 = 120;
        this.m2 = 50;
    }

    public setContext(context: CanvasRenderingContext2D){
        this.context = context;
        this.context.translate(this.width/2, 50);
        this.context.rotate(Math.PI / 2);
    }

    public start(){
        this.iterator();
    }

    public stop(){
        clearInterval(this.interval);
    }

    public applyConfig(config: IPendulumConfig){
        if(config.arm1){
            this.r1 = config.arm1;
        }
        if(config.arm2){
            this.r2 = config.arm2;
        }
        if(config.mass1){
            this.m1 = config.mass1;
        }
        if(config.mass2){
            this.m2= config.mass2;
        }
    }

    public draw(){
        let num1 = -G*(2*this.m1+this.m2) * Math.sin(this.a1);
        let num2 = this.m2 * G * Math.sin(this.a1 - 2 * this.a2);
        let num3 = 2 * Math.sin(this.a1 - this.a2) * this.m2;
        let num4 = (this.v2 * this.v2 * this.r2 + this.v1 * this.v1 * this.r1 * Math.cos(this.a1 - this.a2));
        let den = this.r1 * (2  * this.m1 + this.m2  - this.m2 * Math.cos(2 * this.a1  - 2 * this.a2));
        const acceleration1 = (num1 - num2 - num3 * num4) / den;
        // // -----------------------------

        num1 = 2 * Math.sin(this.a1 - this.a2);
        num2 = this.v1 * this.v1 * this.r1 * (this.m1 + this.m2);
        num3 = G * (this.m1 + this.m2) * Math.cos(this.a1);
        num4 = this.v2 * this.v2 * this.r2 * this.m2 * Math.cos(this.a1 - this.a2);
        den = this.r2 * (2  * this.m1 + this.m2  - this.m2 * Math.cos(2 * this.a1  - 2 * this.a2));
        const acceleration2 = (num1 * (num2 + num3 + num4)) / den;

        // ------


        this.context.clearRect(-this.height / 2, -this.width / 2, this.height * 2, this.width * 2);
        this.initStyles();

        const X1 = Math.round(this.r1 * Math.cos(this.a1));
        const Y1 = Math.round(this.r1 * Math.sin(this.a1));
        this.ball(0, 0, 3);
        this.arm(0, 0, X1, Y1);
        this.ball(X1, Y1, this.scale(this.m1, 0, 300, 0, 30));
        const X2 = Math.round(X1 + this.r2 * Math.cos(this.a2));
        const Y2 = Math.round(Y1 + this.r2 * Math.sin(this.a2));
        this.arm(X1, Y1, X2, Y2);
        this.ball(X2, Y2, this.scale(this.m2, 0, 300, 0, 30));

        this.v1 += acceleration1;
        this.v2 += acceleration2;
        if(this.v1 > Math.PI / 2 || this.v2 > Math.PI / 2) {
            this.v1 = 0;
            this.v2 = 0;
        }
        this.a1 += this.v1;
        this.a2 += this.v2;
    }

    private scale(num:number, inMin:number, inMax:number, outMin:number, outMax:number) {
        return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    private initStyles(){
        this.context.fillStyle = "#222";
        this.context.strokeStyle = '#222';
    }

    private iterator(){
        this.interval = setInterval(() => {
            this.draw();
        }, 30);
    }

    private ball(x:number, y:number, radius:number){
        this.context.beginPath();
        this.context.fillStyle = "#222";
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
        // ctx.arc(0, 0, 0, Math.PI * 2, 0);
        this.context.stroke();
    }

    private arm(x1:number, y1:number, x2:number, y2:number){
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#222';
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
}