const taskList = [];
const badList = [];
const hrPerWeek =  168;

const handleOnSubmit = (e) => {
    const frmData = new FormData(e);

    const task = frmData.get("task");
    const hr = +frmData.get("hr");

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
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${i})"><i class="fas fa-trash" title="Delete"></i></button>
        <button class="btn btn-warning btn-sm"><i class="fas fa-arrow-right" title="Mark as bad list"></i></button>
        </td>
    </tr>
        `
    });

    document.getElementById("task-list").innerHTML = str;
    // console.log(str);
};

const deleteItem = i => {
    taskList.splice(i, 1);
    display();
    totalTaskHours();
}

const totalTaskHours = () => {
    const total = taskList.reduce((subttl, item) => subttl + item.hr ,0);
    document.getElementById("totalHours").innerText = total;
    console.log(total);

}


