
//2
var userGrid = document.getElementById("userGrid")
var viewToggleBtn = document.getElementById("viewToggleBtn")
var deleteIdInput = document.getElementById("deleteIdInput");
var deleteBtn = document.getElementById("deleteBtn");
var sortByGroupBtn = document.getElementById("sortByGroupBtn");
var sortByIdBtn = document.getElementById("sortByIdBtn");


//3
let users = [];

//4
async function retrieveData() {
    try{
    let users_api = "https://69a1dc0a2e82ee536fa2641e.mockapi.io/users_api";
    const response = await fetch(users_api);
    const data = await response.json();
    console.log('Fetched Data:', data);
    users = data;
    console.log('users1', users);
    //6
    render(); 
    } catch (error) {
    
    console.error('Error fetching data:', error);
    
}
}
retrieveData();

console.log('users2', users);
//5
function render()
{
    innerHTML = "";
    users.forEach((user) => {
        innerHTML +=
        `<article class="user-card">
<h3>${user.first_name ?? ""}</h3>
<p>first_name: ${user.first_name ?? ""}</p>
<p>user_group: ${user.user_group ?? ""}</p>
<p>id: ${user.id ?? ""}</p>
</article>`;
  

    });
    userGrid.innerHTML = innerHTML;
    console.log("length of users = ", users.length);
    console.log(userGrid.classList);
}
//7
viewToggleBtn.addEventListener("click", changeview)
function changeview()
{   
    if (userGrid.classList.contains("grid-view"))
    {
        userGrid.classList.remove("grid-view");
        userGrid.classList.add("list-view");
        
    }
    else if (userGrid.classList.contains("list-view"))
    {
        userGrid.classList.remove("list-view");
        userGrid.classList.add("grid-view");
        
    }
}
//8
sortByGroupBtn.addEventListener("click", sortByGroup)
function sortByGroup()
{
   users = users.sort((a, b) => a.user_group - b.user_group);
   render();
}
//9
sortByIdBtn.addEventListener("click", sortById)
function sortById()
{
   users = users.sort((a, b) => a.id - b.id);
   render();
}
deleteBtn.addEventListener("click", deleteUser)
async function deleteUser(){
    let id = deleteIdInput.value;
    console.log(id);
    user_for_deletion = null;
    users.forEach((user) => {
    if (user.id == id)
        user_for_deletion = user;
    })
    if (user_for_deletion == null)
    {
        console.log("cannot delete user. No users with id "+ id +" found");
    }
    else
    {
        try{
        await fetch( "https://69a1dc0a2e82ee536fa2641e.mockapi.io/users_api/"+id, {    method: "DELETE"});
        retrieveData();
        }
        catch (error)
        {
            console.log("User is in the database, but deletion failed: " + error);
        }
    }

}