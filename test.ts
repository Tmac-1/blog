class C {
    protected num: number;
    constructor(num: number) {
        this.num = num;
    }
}

class X extends C {
    protected name: string;
    constructor(num: number, name: string) {
        super(num);
        this.name = name;
    }

    run() {
        console.log(11)
    }
}

// let x = new X(1,'2')