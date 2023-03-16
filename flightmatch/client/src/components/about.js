import React from "react";

export default function About() {

  return (
    <div>
      <h1>About Us!</h1>
        <p style={{marginTop: 20, fontSize: '20px'}}>
          Hello and Welcome to UCLA Flight Match! 
        </p>  
        <p style={{marginTop: 20, fontSize: '20px'}}>
          We are a group of 5 students here at UCLA and this website is our final project for our 
          Computer Science Software Construction class (CS35L).
        </p>  
        <p style={{marginTop: 20, fontSize: '20px'}}>  
         Many students understand how difficult it can be to get to Westwood.  
         Before each quarter, a plethora of out-of-town UCLA students commute from to campus via air travel. 
         With a lack of reliable public transportation in the Los Angeles area, 
              many students must order a ride-share service (e.g. taxi, Uber, Lyft) if they are to get to campus.
        
         However, these rides can cost upwards of $50, $60 and sometimes $80 just to get from the airport to campus. 
        Students cannot afford to pay that much for a single ride!
        </p>
        <p style={{marginTop: 20, fontSize: '20px'}}>  
          Many student have experienced the absolute chaotic mess it can to coordinate car rides from LAX.
          We wanted to create a solution that would provide students a cheaper and more efficient 
          option to find airport rides. 
        </p>  
        <p style={{marginTop: 20, fontSize: '20px'}}>  
          To use our website, login with your UID then search for matching flights on the date of your flight.
          You can create a flight using the CreateFlight button, which will allow other UCLA students to find you to coordinate a ride share.
          If you find a flight that is a match, simply click display profile and you will get the contact informtaion for the person
          who created it. 

        </p>  
        <p style={{marginTop: 20, fontSize: '20px'}}>
          Now you have a streamlined way to find a rideshare group from LAX. We hope this helps! 
        </p>
    </div>
  );
}
