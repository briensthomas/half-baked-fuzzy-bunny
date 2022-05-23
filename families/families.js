import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    
    console.log(await getFamilies());
    for (let family of families) {
        // create three elements for each family; one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        const familyDiv = document.createElement('div');
        familyDiv.classList.add('family');
        
        //    <h3>the Garcia family</h3>
        const h3 = document.createElement('h3');
        h3.textContent = family.name;

        //    <div class="bunnies">
        const bunniesDiv = document.createElement('div');
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        // add the bunnies css class to the bunnies el, and family css class to the family el
        bunniesDiv.classList.add('bunnies');
        for (let bunny of family.fuzzy_bunnies) {
            const bunnyDiv = document.createElement('div');
            bunnyDiv.classList.add('bunny');
            bunnyDiv.textContent = bunny.name;

            bunnyDiv.addEventListener('click', async () => {
                console.log('clicking the bunny div');
                await deleteBunny(bunny.id);
                await displayFamilies();
            });
            bunniesDiv.append(bunnyDiv);
        }
        // put the family name in the name element
        // for each of this family's bunnies
        //    make an element with the css class 'bunny', and put the bunny's name in the text content
        //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
        // append this bunnyEl to the bunniesEl
        familyDiv.append(h3, bunniesDiv);
        familiesEl.append(familyDiv);
    }
    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}
displayFamilies();
