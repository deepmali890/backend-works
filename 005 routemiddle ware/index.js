const express = require('express');
const app = express();

const router1 =express.Router();
const router2 =express.Router();
const router3 =express.Router();
const router4 =express.Router();

const m1 =(req, res, next)=>{
    console.log('middleware 1');

    next();
};

const m2 =(req, res, next)=>{
    console.log('middleware 2');

    next();
};

const m3 =(req, res, next)=>{
    console.log('middleware 3');

    next();
};

const m4 =(req, res, next)=>{
    console.log('middleware 4');

    next();
};

// app.use(m1)
router1.use(m1)
router3.use(m2)
router2.use(m4)
router4.use(m4)
router4.use(m3)


// app.get('/r98', (req, res)=>{
//     res.send('hello')
// })


router1.get('/r1', (req, res)=>{
    res.send('hello')
});

router1.get('/r2', (req, res)=>{
    res.send('hello')
});

router1.get('/r3', (req, res)=>{
    res.send('hello')
});

router1.get('/r4', (req, res)=>{
    res.send('hello')
});

router1.get('/r5', (req, res)=>{
    res.send('hello')
});

router3.get('/r6', (req, res)=>{
    res.send('hello')
});

router3.get('/r7', (req, res)=>{
    res.send('hello')
});

router3.get('/r8', (req, res)=>{
    res.send('hello')
});

router3.get('/r9', (req, res)=>{
    res.send('hello')
});

router3.get('/r10', (req, res)=>{
    res.send('hello')
});


router4.get('/r11', (req, res)=>{
    res.send('hello')
});

router4.get('/r12', (req, res)=>{
    res.send('hello')
});

router4.get('/r13', (req, res)=>{
    res.send('hello')
});

router4.get('/r14', (req, res)=>{
    res.send('hello')
});

router4.get('/r15', (req, res)=>{
    res.send('hello')
});

router4.get('/r16', (req, res)=>{
    res.send('hello')
});

router4.get('/r17', (req, res)=>{
    res.send('hello')
});

router4.get('/r18', (req, res)=>{
    res.send('hello')
});

router4.get('/r19', (req, res)=>{
    res.send('hello')
});

router4.get('/r20', (req, res)=>{
    res.send('hello')
});




app.use(router1,router4,router3)
router3.use(router1,router2)
// router3.use()



app.listen(4200, ()=>{
    console.log('Server is running on port 4200');
})

// router2.get('/r6tor10', ()=>{});

// router4.get('/r11tor20',()=>{});