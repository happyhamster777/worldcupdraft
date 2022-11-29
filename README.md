# Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
With the FIFA World Cup happening this year, I built out a World Cup predictor application in which the user can choose 5 teams (one from each Pool) and submit their teams. Each World Cup team is ranked based on their performance via a scoring system (outline in the `Rules` page). There are 32 cards (one for each World Cup team) and the user can select teams. There is an aggregator value which is the total number of points that the teams have used so far.  

### Usability Principles Considered
1. Since there are many teams, I made the filter panel `position: sticky` so that even when the user scrolls they are able to continue sorting and filtering the values.
2. The `MyTeams` section at the top is also sticky so that it constantly shows the teams that the user has selected, while the less significant header at the top of the page dissapears. 
2. Note that the page is also responsive and works on mobile browsers. 

### Organization of Components
```
<App>
    <Header/>
    <MyTeams/>
    <Teams>
        <TeamCard> x32
    <Filters>
```

### How Data is Passed Down Through Components

Since I used functional components, I passed data into the components using props. I also used a package, React Recoil, to have global state for the application and to store things like filters. 

### How the User Triggers State Changes

The user triggers state changes using onClick functionality of various buttons. When a state is changed the components that are dependent on that state update independently. For example, when a user clicks on the `Add` button for Brazil, it will `Add` it to Pool 1 and both the Teams page as well as the `MyTeams` section at the top of the page will change. 
