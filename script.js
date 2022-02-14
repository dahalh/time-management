const taskList = [];
const badList = [];
const hrPerWeek =  168;

let total;


const handleOnSubmit = (e) => {
    const frmData = new FormData(e);

    const task = frmData.get("task");
    const hr = +frmData.get("hr");

    if(hr < 1) {
        return alert("Please enter numbers greater than 0");
    } 

    const ttlBadHrs = totalBadHours();

    const total = taskList.reduce((subttl, item) => subttl + item.hr ,0) + hr;

    if(ttlBadHrs + total > hrPerWeek){
        return alert(` You have exceeded the maximum hours. One week has ${hrPerWeek} hours!`);
    }


    //MY ATTEMPT
    // if(total === hrPerWeek){
    //     totalTaskHours();
    //     display();
    // } else if (total > hrPerWeek){
    //     alert(`This exceeds ${hrPerWeek} hours. You cannot allocated hours more than this.`);
    //     return;
    // }

    
    const obj = {
        task,
        hr,
    };

    taskList.push(obj);
    display();
    totalTaskHours();


};

const display = () =>{
    // console.log(taskList, "from display");
    let str = "";

    taskList.map((item, i)=> {
        str += `
    <tr>
        <td>
            <input type="checkbox" name="" id="">
            ${item.task}
        </td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})">
        <i class="fas fa-trash" title="Delete"></i>
        </button>
        <button class="btn btn-warning btn-sm btn-warning" onclick="markAsNotToDo(${i})">
        <i class="fas fa-arrow-right" title="Mark as bad list"></i>
        </button>
        </td>
    </tr>
        `
    });

    document.getElementById("task-list").innerHTML = str;
    // console.log(str);
};
const displayBadList = () =>{
    // console.log(taskList, "from display");
    let str = "";

    badList.map((item, i)=> {
        str += `
    <tr>
        <td>
            <input type="checkbox" name="" id="">
            ${item.task}
        </td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
        <button class="btn btn-warning btn-sm btn-warning" onclick="markAsToDo(${i})">
        <i class="fa-solid fa-arrow-left" title="Mark as good list"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteBadItem(${i})">
        <i class="fas fa-trash" title="Delete"></i>
        </button>
        </td>
    </tr>
        `
    });

    document.getElementById("bad-list").innerHTML = str;
    // console.log(str);
};

const deleteItem = i => {
    if(!confirm("Are you sure you want to delete this item?")){
        return;
    }
    taskList.splice(i, 1);
    display();
    totalTaskHours();
}

const deleteBadItem = i => {
    if(!confirm("Are you sure you want to delete this item?")){
        return;
    }
    badList.splice(i, 1);
    displayBadList();
    totalTaskHours();
    totalBadHours();
}



const totalTaskHours = () => {
    const total = taskList.reduce((subttl, item) => subttl + item.hr ,0);

    const ttlBadHrs = totalBadHours();

    const ttlHrs = total + ttlBadHrs;

    const hrsLeft = hrPerWeek - ttlHrs;

    document.getElementById("totalHours").innerText = ttlHrs;
    document.getElementById("hoursLeft").innerText = hrsLeft;

}

const totalBadHours = () => {
    const total = badList.reduce((subttl, item) => subttl + item.hr ,0);
    document.getElementById("totalBadHrs").innerText = total || 0;

    return total;

}

const markAsNotToDo = i => {
    const itm = taskList.splice(i, 1);
    display();
    badList.push(itm[0]);
    displayBadList();
    totalBadHours();
}

const markAsToDo = i => {
    const itm = badList.splice(i, 1);
    displayBadList();
    taskList.push(itm[0]);
    display();
    totalTaskHours();
}


