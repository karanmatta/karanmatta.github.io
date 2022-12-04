// Global Variables

let list = document.getElementById('list');
let nodes = document.getElementsByClassName('node');
let pointers = document.getElementsByClassName('pointer');

let error = document.getElementById('error');

// Animations Timeouts

let nodeAnimationTimeout;
let pointerAnimationTimeout;
let deleteTimeout;

function setAnimationsTimeOuts(animations) {
    nodeAnimationTimeout = animations.nodeAnimationTimeout;
}

// 'Private' functions

let errorCircle = '<i class="fas fa-exclamation-circle"></i> ';


function checkInputErrors(input, type, endsAtLastNode = false) {
    let inputError = false;
    let end = endsAtLastNode ? nodes.length - 1 : nodes.length;

  if (type === "Index" && (input > end || input < 0)) {
        error.innerHTML = errorCircle + "Index Out Of Bounds";
        inputError = true;
    }

    if (inputError) {
		error.firstChild.style.animation = "highlightNode .8s ease";
        document.getElementById("value").style.display="none"; }
    else{
        error.innerHTML = null;
        document.getElementById("value").style.display="block";
    }

    return inputError;
}

function animateNode(i) {
    return new Promise(resolve => {
        nodes[i].style.animation =
            "highlightNode " +
            nodeAnimationTimeout / 1000 + "s " +
            "ease";
        setTimeout(() => {
            nodes[i].style.animation = null;
            resolve();
        }, nodeAnimationTimeout);
    });
}   

function animatePointer(i) {
    return new Promise(resolve => {
        pointers[i].style.animation =
            "highlightPointer " +
            pointerAnimationTimeout / 1000 + "s " +
            "ease";
        setTimeout(() => {
            pointers[i].style.animation = null;
            resolve();
        }, pointerAnimationTimeout);
    });
}



async function animateNodes(from, to) {
    for (let i = from; i <= to; i++) {
        await animateNode(i);
        await animatePointer(i);
    }
}


function animateNodesBeforeInsert (from, to) {
    return new Promise(resolve => {
        for (let i = from; i < to; i++) {
            console.log('length3', nodes.length)
            

            nodes[i].style.animation = 
                "moveRightNode " +
                pointerAnimationTimeout / 1000 + "s "+
                "ease";

            pointers[i].style.animation = 
                "moveRightNode " +
                pointerAnimationTimeout / 1000 + "s "+
                "ease";

            setTimeout(() => {
                
                nodes[i].style.animation = null;
                pointers[i].style.animation = null;
            }, pointerAnimationTimeout)
        }

        setTimeout(() => resolve(), pointerAnimationTimeout)
    })
}

// Public functions

async function add(i, data) {

    if (checkInputErrors(i, "Index") || checkInputErrors(data, "Data"))
        return;

   	// Create DOM Elements
       
    let node = document.createElement('div');
    node.classList.add('node');

    let number = document.createElement('p');
    number.classList.add('number');

    let text = document.createTextNode(data);

    number.appendChild(text);
    node.appendChild(number);

    let pointer = document.createElement('div');
    pointer.classList.add('pointer');
    pointer.style.opacity = "0";

    let img = document.createElement('img');
    img.src = "img/pointer.png";

    pointer.appendChild(img);

    if (i === nodes.length) {
        await animateNodes(0, nodes.length - 1); 
        list.appendChild(node);
        list.appendChild(pointer);
        
    }
    else {
        await animateNodes(0, i - 1);
        await animateNodesBeforeInsert(i, nodes.length)
        list.insertBefore(pointer, nodes[i]);
        list.insertBefore(node, pointer);
    }

    node.style.animation =
        "grow " +
        nodeAnimationTimeout / 1000 + "s " +
        "ease";

    setTimeout(() => {
        pointer.style.opacity = 1;
        pointer.style.animation =
            "slide " +
            pointerAnimationTimeout / 1000 + "s " +
            "ease";
    }, nodeAnimationTimeout);
}


