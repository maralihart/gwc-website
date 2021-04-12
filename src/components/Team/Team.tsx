import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { request } from 'graphql-request';
import { createExpressionWithTypeArguments, transpileModule } from 'typescript';

// TODO: Make a profile component with photo, name, position
// TODO: Add beginning copy
// TODO: (can be separate PR), have an archive of old exec

function Team() {
  const [team, setTeam] = useState<any[]>([]);
  var arrays: any[][] = [];
  
  useEffect(() => {
    const fetchTeam = async () => {
      const { executiveMembers } = await request(
        process.env.REACT_APP_GRAPHCMS_URL ? process.env.REACT_APP_GRAPHCMS_URL : "",
        `
          { 
            executiveMembers {
              id
              name
              position
              academicYear
              headshot {
                url
              }
            }
          }
        `
      );
      setTeam(executiveMembers);
    };

    fetchTeam();

    for(let i = 0; i<6; i+=3) {
      arrays.push(team.slice(i, i+3))
    }
    /*while (team.length > 2) {
      arrays.push(team.splice(0, 3));
    }*/
    console.log("hi");
    for(var i = 0; i<arrays.length; i++) {
      for(var j = 0; j<arrays[0].length; j++) {
          console.log(arrays[i][j].name);
      }
    }

    //Turn titles into proper ones
    //Ternary conditionals ^ use for above
    //position == "PR" && "Public Relations"
    //w/ ternary operator you do need the else

    /*<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>
    */
    }, []);

  return (
    <div>
      <h4>The best work is produced when diverse voices help create it.</h4>
      <p>Our leadership team works together to disrupt the image of stereotypical programmer. Meet our wave-makers!</p>
      {/* iterate through team for the profile. hint: console.log() to see what the data structure looks like and how you can use it */}
      {console.log(team[0] + "test")}
      {team.map(mem => <Profile name={mem.name} img={mem.headshot.url} position={mem.position}></Profile>)}
      {arrays.map(mem => 
        <div className="row">
          <Profile name={mem[0].name} img={mem[0].headshot.url} position={mem[0].position}></Profile>
          <Profile name={mem[1].name} img={mem[1].headshot.url} position={mem[1].position}></Profile>
          <Profile name={mem[2].name} img={mem[2].headshot.url} position={mem[2].position}></Profile>
        </div>
      )}
    </div>
  );
}

export default Team;
