const APIURL = "https://newton.now.sh/api/v2/";

let search = document.getElementById("search-btn");
const main = document.getElementById("card-main");

let solution = [];

async function getSolution(){
    let problem = document.getElementById("problem");
    const category = document.getElementById("select-category");
    let converted = convert(problem.value);
    const resp = await fetch(APIURL + category.value + `/${converted}`);
    const data = await resp.json();

    solution.push(data);
    let output = `
    <div class="card">
        <p class="question">
            <span id="categoryOutput">${data.operation} : </span>
            <span id="problemInp">${data.expression}</span>
        </p>
        <p id="solution">
            ${data.result}
        </p>
    </div>
    `
    localStorage.setItem("solution" , JSON.stringify(solution));

    main.innerHTML = output;
}
search.addEventListener('click' , () => {
    if(problem.value == ""){
        alert("Enter Expression!");
    }else{
        getSolution();
        problem.value = "";
    }
}) 
const saveBtn = document.getElementById("save-btn");
const closed = document.getElementsByClassName("close")[0];
const savedSol = document.getElementById("savedSol");

function convert(expression) {
    let encodedExpression = encodeURIComponent(expression);
    return encodedExpression;
}

if(localStorage.getItem("solution")){
    solution = JSON.parse((localStorage.getItem("solution")));
}

saveBtn.addEventListener("click" , () => {
    document.getElementById("saved-content").innerHTML = "";
    savedSol.style.display = "block";
    savedSolution();
})  

closed.onclick = function() {
    savedSol.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == savedSol) {
      savedSol.style.display = "none";
    }
}

function savedSolution() {
    const savedSolDiv = document.getElementById("saved-content");
    if (solution.length > 0) {
        solution.forEach((each) => {
            let content = `
            <div class="card">
                <p class="question">
                    <span id="categoryOutput">${each.operation} : </span>
                    <span id="problemInp">${each.expression}</span>
                </p>
                <p id="solution">
                    ${each.result}
                </p>
                <button class="deleteBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg></button>
            </div>
            `
            savedSolDiv.innerHTML += content;
        })
        deleteSolution();
    } else {
        let cont = `
            <div class="nothingSaved">
                <p>No saved solution found!!</p>    
            </div>
        `
        savedSolDiv.innerHTML = cont;
    }
}

function deleteSolution() {
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    if(deleteBtn.length){
        for(let i=0 ; i<deleteBtn.length ; i++){
            deleteBtn[i].addEventListener('click' , () => {
                console.log("Button" + i);
                solution.splice(i, 1)
                if(solution.length > 0){
                    localStorage.setItem("solution" , JSON.stringify(solution));
                }else{
                    localStorage.removeItem("solution");
                    document.getElementById("savedSol").style.display = "none";
                }
                document.getElementById("saved-content").innerHTML = ""
                savedSolution();
            })
        }
    }
}