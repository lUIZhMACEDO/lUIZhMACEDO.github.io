function updateDateTime() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    var period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 

    var formattedTime = hours + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ' ' + period;

    var formattedDateTime = mm + '/' + dd + '/' + yyyy + "<br>" + formattedTime;

    document.getElementById("currentDate").innerHTML = formattedDateTime;
}

updateDateTime();

setInterval(updateDateTime, 1000);


let installPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
    
    event.preventDefault();
   
    installPrompt = event;
  
    showAddToHomeScreenUI();
});

function showAddToHomeScreenUI() {
       const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';
    installButton.addEventListener('click', async () => {
        if (!installPrompt) return;
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        installPrompt = null;
       
        installButton.style.display = 'none';
    });
}
