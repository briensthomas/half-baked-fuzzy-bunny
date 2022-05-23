import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    // use createBunny to create a bunny with this name and family id
    await createBunny({
        name: data.get('bunny-name'),
        family_id: data.get('family-id'),
    });
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const familySelect = document.querySelector('select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
       // create an option tag
        const selectOption = document.createElement('option');
        // set the option's value and text content
        selectOption.value = family.id;
        selectOption.textContent = family.name;
        
        familySelect.append(selectOption);
    }
    // and append the option to the select
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
