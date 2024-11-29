let container = document.querySelector('.container');
let paintBtn = document.getElementById('paint-btn');
let EraseBtn = document.getElementById('erase-btn');
let ClearGridBtn = document.getElementById('clear-grid');
let CreateGridBtn = document.getElementById('submit-grid');
let heightValue = document.getElementById('height-value');
let widhtValue = document.getElementById('width-value');
let GridHeight = document.getElementById('height-range');
let GridWidth = document.getElementById('width-range');
let ColorBtn = document.getElementById('color-input');

let events = {
    mouse:{
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup',
    },
    touch:{
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchend',
    }
}

let evetdevice = "";

let draw = false;
let erase = false;

const isTouchDevice = () =>{
    try{
        document.createEvent('TouchEvent');
        devicetype = 'touch';
        return true;
    }
    catch(e){
        devicetype = 'mouse';
        return false;
    }
};

isTouchDevice();

CreateGridBtn.addEventListener('click', () => {
    container.innerHTML = "";
    let count = 0;
    for(let i = 0; i < GridHeight.value; i++){
        count += 2;
        let div = document.createElement('div');
        div.classList.add('gridRow');

    for(let j = 0; j < GridWidth.value; j++){
        count += 2;

        const col = document.createElement('col');
        col.classList.add('gridCol');
        col.setAttribute('id', `gridCol${count}`);
        col.addEventListener(events[devicetype].down, () =>{
            draw = true;
            if(erase){
                col.style.backgroundColor = 'transparent';
            } else{
                col.style.backgroundColor = ColorBtn.value;
            }
        });

        col.addEventListener(events[devicetype].move, (e) =>{
            let elementId = document.elementFromPoint(
                !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                !isTouchDevice() ? e.clientY : e.touches[0].clientY
            ).id;
            checker(elementId);
        });
        col.addEventListener(events[devicetype].up, () =>{
            draw = false;
        });

        div.appendChild(col);
    }

        container.appendChild(div);
    }
});

function checker(elementId){
    let gridColumns = Array.from(document.querySelectorAll('.gridCol'));
    gridColumns.forEach((element) => {
        if (draw && !erase) {
            element.style.backgroundColor = ColorBtn.value;
        } else if (draw && erase) {
            element.style.backgroundColor = 'transparent';
        }
    });    
}


ClearGridBtn.addEventListener('click', () => {
    container.innerHTML = "";
});

EraseBtn.addEventListener('click', () =>{
    erase = true;
});

paintBtn.addEventListener('click', () =>{
    erase = false;
});

GridWidth.addEventListener('input', () =>{
    widhtValue.innerHTML = GridWidth.value < 9 ? `0${GridWidth.value}`: GridWidth.value;
});

GridHeight.addEventListener('input', () =>{
    heightValue.innerHTML = GridHeight.value < 9 ? `0${GridHeight.value}`: GridHeight.value;
});

window.onload = () =>{
    GridHeight.value = 0;
    GridWidth.value = 0;
}
