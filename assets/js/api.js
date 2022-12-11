const api = {

init: () => {
    console.log('data init');
    //? API FETCH EXEMPLES
    // https://github.com/SimonChabrier/bikeManagementSystem/blob/main/public/assets/js/inventoryForm.js
},

//* OK
getData: async () => {
    console.log('getData');
    //const location = window.location.origin;
    const endPoint = '/api/tasks';
    //const apiRootUrl = location + endPoint;
    const apiRootUrl = 'https://127.0.0.1:8000' + endPoint;

    let fetchOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    };
    try {
        response = await fetch(apiRootUrl, fetchOptions);
        data = await response.json();
        if(response.status === 200){
            console.table(data);
            console.log('GET ALL DATAS SUCCESS');
        }
    } catch (error){
        console.log(error);
    }
    //console.table(data);
    //* si j'ai des données...alors je les affiche
    if(data.length){
    tpl.setColumnTemplate(data);

        app.handleDragAndDrop();
        app.handleDeleteColumn();
        app.handleDeleteCard();
        app.handleChangeCardColor();
        app.handleDesableCheckBoxOnEmptyCard();
        app.handleTaskDone();
        app.handleDisableDragOnActiveInputs();
        app.handleHideColorsBtnsOnDoneCards();
        app.handleGetColumnName();
        app.updateAllCardsNumberAndColumnName();
    }
},

//* OK
getLastCreatedCard: async () => {
    console.log('getLastCreatedCard');

    //const location = window.location.origin;
    const endPoint = '/api/tasks/last';
    //const apiRootUrl = location + endPoint;
    const apiRootUrl = 'https://127.0.0.1:8000' + endPoint;

    let fetchOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    };
    try {
        response = await fetch(apiRootUrl, fetchOptions);
        data = await response.json();
        if(response.status === 200){
            console.table(data);
            console.log('SUCCESS - GET LAST CREATED CARD')
        }
    } catch (error){
        console.log(error);
    }
    
    tpl.setNewCardTemplate(data);

    app.handleDragAndDrop();
    app.handleDeleteColumn();
    app.handleDeleteCard();
    app.handleChangeCardColor();
    app.handleDesableCheckBoxOnEmptyCard();
    app.handleTaskDone();
    app.handleDisableDragOnActiveInputs();
    app.handleHideColorsBtnsOnDoneCards();
    app.handleGetColumnName();
    app.updateAllCardsNumberAndColumnName();
    app.handleNewColumnSetNumber();
},

//* OK
getLastCreatedColumn: async () => {
console.log('getLastCreatedColumn');
     //const location = window.location.origin;
     const endPoint = '/api/columns/last';
     //const apiRootUrl = location + endPoint;
     const apiRootUrl = 'https://127.0.0.1:8000' + endPoint;
 
     let fetchOptions = {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache'
     };
     try {
         response = await fetch(apiRootUrl, fetchOptions);
         data = await response.json();
         if(response.status === 200){
            console.table(data);
             console.log('SUCCESS - GET LAST CREATED COLUMN')
         }
     } catch (error){
         console.log(error);
     }
     
    tpl.setNewColumnTemplate(data);

    app.handleDragAndDrop();
    app.handleDeleteCard();
    app.handleDeleteColumn();
    app.handleChangeCardColor();
    app.handleDesableCheckBoxOnEmptyCard();
    app.handleTaskDone();
    app.handleDisableDragOnActiveInputs();
    app.handleHideColorsBtnsOnDoneCards();
    app.handleGetColumnName();
    app.updateAllCardsNumberAndColumnName();
},

//* OK
postCard: async () => {

    const firstColumnid = document.querySelectorAll('.cards--dropzone')[0].getAttribute('id');
    
    const cardData = { 
        "task_title": "",
        "task_content": "",
        "task_done": false,
        "column_number": "1",
        "card_number": "",
        "card_color": "card--color--default",
        "textarea_height": "150"
    };

    const response = await fetch('https://127.0.0.1:8000/api/tasks/' + firstColumnid, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    });
    if (response.status === 201) {
        console.log('SUCCESS - POST CARD')
    }
    //const data = await response.json();
    api.getLastCreatedCard();
},

//* OK
postColumn: async () => {    

    const columnData = { 
        "column_name": "",
		"column_number": 1
    };

    const response = await fetch('https://127.0.0.1:8000/api/column', {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(columnData)
    });
    if (response.status === 201) {
        console.log('SUCCESS - POST COLUMN')
    }
    //const data = await response.json();
    api.getLastCreatedColumn();
},

//* OK 
patchCard: async (cardId, cardData, columnId) => {        

    if(cardData){
    const response = await fetch('https://127.0.0.1:8000/api/' + columnId + '/task/' + cardId, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    });
        // const data = await response.json( ); 
        // console.table(data);
        if (response.status === 200) {
            console.log('PATCH CARD SUCCESS')
        }
    }
},

//* OK
patchColumn: async (id, columnName) => {  

    const columnData = { 
        "column_name": columnName,
    };

    const response = await fetch('https://127.0.0.1:8000/api/column/' + id, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(columnData)
    });

    // const data = await response.json( ); 
    // console.table(data);
    if (response.status === 200) {
        console.log('PATCH COLUMN SUCCESS')
    }
},

//* OK
deleteCard: async (id) => {                               

    await fetch('https://127.0.0.1:8000/api/task/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
    })
    .then(response => {
        if(response.status == 200){
        console.log('DELETE CARD SUCCESS')
        //return response.json( )
        }
    })
    // .then(data => 
    //     console.log(data) 
    // ); 
},

//* OK
deleteColumns: async (id) => {                                          

    await fetch('https://127.0.0.1:8000/api/column/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
    })
    .then(response => {
        if(response.status == 200){
        console.log('DLETE COLUMN SUCESS')
        //return response.json()
        }
    })
    // .then(data => 
    //     console.log(data) 
    // );
},

}   

document.addEventListener('DOMContentLoaded', api.init);