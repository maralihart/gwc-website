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
  }, []);

  return (
    <div>
      <h4>The best work is produced when diverse voices help create it.</h4>
      <p>Our leadership team works together to disrupt the image of stereotypical programmer. Meet our wave-makers!</p>
      {/* iterate through team for the profile. hint: console.log() to see what the data structure looks like and how you can use it */}
      {console.log(team[0] + "test")}
      {team.map(mem => <Profile name={mem.name} img={mem.headshot.url} position={mem.position}></Profile>)}
      {arrays.map(mem => 
        <div className="picrow">
          <Profile name={mem[0].name} img={mem[0].headshot.url} position={mem[0].position}></Profile>
          <Profile name={mem[1].name} img={mem[1].headshot.url} position={mem[1].position}></Profile>
          <Profile name={mem[2].name} img={mem[2].headshot.url} position={mem[2].position}></Profile>
        </div>
      )}
      <Profile name="Emily" img="" position="President" />
    </div>
  );
}

export default Team;
