// Récupéer nom de la conlonne 1
// const columName = document.getElementsByClassName('input--column--name')[0].value;

const tpl = {

init: () => {
    console.log('tpl init');
    tpl.setColumnTemplate(columns);
},

// setCardTemplate: (cards) => {   
//     cards.forEach(card => {
//         const target = document.getElementById('backlog_column');
//         const cardTemplate = document.getElementById("card_template").content.cloneNode(true);
        
//         cardTemplate.querySelector('.draggable--card').setAttribute('column_number', card.column_number);
//         cardTemplate.querySelector('.draggable--card').setAttribute('card_number', card.card_number);
        
//         if (card.task_done == 'true') {
//             cardTemplate.querySelector('.draggable--card').classList.add('task--done');
//             cardTemplate.querySelector('.draggable--card').setAttribute('task_done', card.task_done);
//             cardTemplate.querySelector('.card--checkox').setAttribute('checked', 'checked');
//         }
        
//         if (card.card_color !== 'card--color--default') {
//             cardTemplate.querySelector('.draggable--card').classList.add(card.card_color);
//             cardTemplate.querySelector('.draggable--card').setAttribute('card_color',  card.card_color);
//         }

//         cardTemplate.querySelector('.card--title').setAttribute('value', card.task_title);
//         cardTemplate.querySelector('.card--text').innerHTML = card.task_content;
//         cardTemplate.querySelector('.card--text').style.height = card.textarea_height;

//         target.appendChild(cardTemplate);
//     });
// },

// * 1 - CONSTRUCTION DES COLONNES
setColumnTemplate: (columns) => {
    // je crée les colonnes
    columns.forEach(column => {
        const target = document.getElementById('columns_container');
        const columnTemplate = document.getElementById('column_template').content.cloneNode(true);
        
        columnTemplate.querySelector('.cards_dropzone').setAttribute('column_number', column.column_number);
        columnTemplate.querySelector('.input--column--name').value = column.placeholder;
        target.appendChild(columnTemplate); 
        // Je passe les carte à setCardTemplate
        tpl.setCardTemplate(column.cards);  
    }); 
},

// * 2 - CONSTRUCTION DES CARTES
setCardTemplate: (cards) => {   
    
    // j'utilise ? pour dire que si cards existe alors je fais le forEach (optionnal chaining)
    cards?.forEach(card => {
        const cardTemplate = document.getElementById("card_template").content.cloneNode(true);
        
  
        cardTemplate.querySelector('.draggable--card').setAttribute('column_number', card.column_number);
        cardTemplate.querySelector('.draggable--card').setAttribute('card_number', card.card_number);

        if (card.task_done == 'true') {
            cardTemplate.querySelector('.draggable--card').classList.add('task--done');
            cardTemplate.querySelector('.draggable--card').setAttribute('task_done', card.task_done);
            cardTemplate.querySelector('.card--checkox').setAttribute('checked', 'checked');
        }

        if (card.card_color !== 'card--color--default') {
            cardTemplate.querySelector('.draggable--card').classList.add(card.card_color);
            cardTemplate.querySelector('.draggable--card').setAttribute('card_color',  card.card_color);
        }

        cardTemplate.querySelector('.card--title').setAttribute('value', card.task_title);
        cardTemplate.querySelector('.card--text').innerHTML = card.task_content;
        cardTemplate.querySelector('.card--text').style.height = card.textarea_height;

        // time out pour que le DOM soit chargé
        setTimeout(() => {
        // si la carte a le numéro de colonne 1 alors je l'ajoute à la colonne 1
        let newColumns = document.querySelectorAll('.cards_dropzone');
        newColumns?.forEach(newColumn => {
            if (newColumn.getAttribute('column_number') == card.column_number) {
                newColumn.appendChild(cardTemplate);
            }
        });
        }, 100);
    });
},


    
}



document.addEventListener('DOMContentLoaded', tpl.init);