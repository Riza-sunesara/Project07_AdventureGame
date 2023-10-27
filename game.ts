#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,5000);
    })
}

class player{
    name!:string;
    energylevel:number=100;
    constructor(name:string){
        this.name=name;
    }

    energylevelUp(){
        this.energylevel=100;
    }

    energylevelDown(){
        this.energylevel-=25;
    }

}

class opponent{
    name!:string;
    strength: number = 100;
    constructor(name:string){
        this.name=name;
    }

    energylevelDown(){
        this.strength-=25;
    }
}

let user= await inquirer.prompt([
    {
        message:"Player Enter your name:",
        name:"player",
        type:"input"
    }
])

let opp= ['Skeleton', 'Assassin', 'Zombie'];
let random_opponent = opp[Math.floor(Math.random() * opp.length)];
let p1=new player(user.player);
let op1=new opponent(random_opponent);
console.log(chalk.magenta(`         Welcome ${p1.name}`));
console.log(chalk.green(`Your Energy level is:${p1.energylevel}. GOOD LUCK!`));
console.log(chalk.yellow(`         ${op1.name} has appeared`));
await sleep();
console.log(`         ${chalk.blue.bold(p1.name)} VS ${chalk.blue.bold(op1.name)}`);

do {
    
    let ask=await inquirer.prompt([
        {
            name:"choose",
            message:"What you want to do?",
            type:"list",
            choices:["Attack","Drink energy portion","Accept Defeat and run for your life"]
        }
    ])

    if(ask.choose=="Attack"){
        let i=Math.floor(Math.random()*2);
        if(i>0){
            p1.energylevelDown(); 
            console.log(chalk.bold.magenta(`${p1.name} you have ${chalk.yellow(p1.energylevel)} remaining`));
            console.log(chalk.bold.blue(`${op1.name} you have ${chalk.yellow(op1.strength)} remaining`));
            if(p1.energylevel<=0){
                let lost=chalkAnimation.neon(chalk.red.bold("You got defeated. GAME OVER"));    
                await sleep();
                lost.stop();
                process.exit();
            }
        }
        else if(i<=0){
            op1.energylevelDown();             
            console.log(chalk.bold.blue(`${p1.name} you have ${chalk.yellow(p1.energylevel)} remaining`));
            console.log(chalk.bold.magenta(`${op1.name} you have ${chalk.yellow(op1.strength)} remaining`));
            if(op1.strength<=0){
                let won=chalkAnimation.neon(chalk.green.bold("You Won. Hurray"));
                await sleep();
                won.stop();
                process.exit();
            }
        }
    }
    else if(ask.choose=="Drink energy portion"){
        p1.energylevelUp();
        console.log(`${chalk.bold.green(p1.name)} you have regained energy: ${chalk.yellow(p1.energylevel)}`);
    }
    else if(ask.choose=="Accept Defeat and run for your life"){
        let lost=chalkAnimation.neon(chalk.red.bold("You got defeated. GAME OVER"));
        await sleep();
        lost.stop();
        process.exit();
    }
    
} while (true);