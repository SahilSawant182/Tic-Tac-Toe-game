let currentPlayer_html = document.querySelector("#CurrentPlayer"); 
console.log(currentPlayer_html.textContent);
let currentPlayer_js = "x";
let cells = document.querySelectorAll(".cell");

const player_x = []; 
const player_o = [];
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        console.log(cell.getAttribute("data-index"));
        cell.textContent = currentPlayer_js.toUpperCase();
        if(currentPlayer_js == "x"){ 
            player_x.push(cell.getAttribute("data-index")); 
            currentPlayer_js = "o"; 
            currentPlayer_html.textContent = "Player O's Turn"
        }
        else{ 
            player_o.push(cell.getAttribute("data-index"));
            currentPlayer_js = "x"; 
            currentPlayer_html.textContent = "Player X's Turn"
        }
    });
});
// gameBoard.addEventListener("click" , )

// for(let i = 1; i <= 6; i++){ 

// }