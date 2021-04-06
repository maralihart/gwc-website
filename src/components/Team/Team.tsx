import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { request } from 'graphql-request';

// TODO: Make a profile component with photo, name, position
// TODO: Add beginning copy
// TODO: (can be separate PR), have an archive of old exec

function Team() {
  const [team, setTeam] = useState<any[]>([]);
  
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
  }, []);

  return (
    <div>
      <h4>The best work is produced when diverse voices help create it.</h4>
      <p>Our leadership team works together to disrupt the image of stereotypical programmer. Meet our wave-makers!</p>
      {/* iterate through team for the profile. hint: console.log() to see what the data structure looks like and how you can use it */}
      {console.log(team[0] + "test")}
      {team.map(mem => <Profile name={mem.name} img={mem.headshot.url} position={mem.position}></Profile>)}
      <Profile name="Emily" img="" position="President" />
    </div>
  );
}

export default Team;
