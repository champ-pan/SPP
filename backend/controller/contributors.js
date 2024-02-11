import { createUser } from './user.js';
import project from '../models/project.js';
import { Octokit } from '@octokit/rest';
import axios from 'axios';

const octokit = new Octokit({
    auth: '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'
})

const apiKey = "AIzaSyCsYvd4WAyrngOoTdmfIxVgr9IruQ1y2K4";

export const getContributors = async (req, res) => {
    const project_name = req.body.name;

    try {
        let users = [];

        const projects = await project.find();
        const ret_project = [];
        projects.forEach(element => {
            if (element.name == project_name) {
                ret_project.push(element);
            }
        });
        const contributors = ret_project[0].contributors;
        // console.log(contributors);

        for (let i = 0; i < contributors.length; i++) {
            const { data: user } = await octokit.users.getByUsername({
                username: contributors[i],
            });
            const username = user.login;
            const location = user.location;
            let new_location = {
                city: "",
                countryCode: "",
                coordinates: {
                    latitude: 0,
                    longitude: 0,
                }
            }
            let time_zone_difference = 0;
            let newUser = {
                username: username,
                location: new_location,
                time_zone_difference: time_zone_difference,
            }
            console.log(location);
            if (location != null) {
                new_location.coordinates = await getCoordinates(location)
                for (let i = 0; i < location.length; i++) {
                    if (location[i] == ",") {
                        new_location.city = location.substring(0, i);
                        //make the country code the country name if the country code is not available
                        new_location.countryCode = location.substring(i + 2, location.length);
                        break;
                    }
                }
                console.log(new_location);

                const timeZone2 = await getTimeZone(new_location.coordinates);
                // console.log(timeZone2);

                // Get the current UTC time
                const currentTime = new Date()
                // console.log("current: " + currentTime);

                //print out timeZone2 time in UTC time zone format 
                const timeZone2Time = new Date(currentTime.getTime() + timeZone2.rawOffset * 1000)
                // console.log("timeZone2: " + timeZone2Time);

                // Get the time zone difference in hours
                time_zone_difference = (timeZone2Time.getTime() - currentTime.getTime()) / 1000 / 60 / 60;
                // console.log("time_zone_difference: " + time_zone_difference);
                newUser.time_zone_difference = time_zone_difference;
                newUser.location = new_location;
            }
            users.push(newUser);
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function getTimeZone(location) {
    // console.log(location);
    try {

        // Get the current timestamp
        const timestamp = Math.floor(Date.now() / 1000);

        // Get the time zone data for the location
        const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.latitude},${location.longitude}&timestamp=${timestamp}&key=${apiKey}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            // console.log(data);
            const timeZoneId = data.timeZoneId;
            const timeZoneName = data.timeZoneName;
            const rawOffset = data.rawOffset;

            return { timeZoneId, timeZoneName, rawOffset };
        } else {
            console.error(`Error fetching time zone information: ${data.status}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching time zone:', error.message);
        return null;
    }
}

async function getCoordinates(location) {
    // console.log("User Location: " + location)
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: apiKey,
            },
        });

        const data = response.data;

        if (data.status === 'OK' && data.results.length > 0) {
            const coordinates = data.results[0].geometry.location;
            const latitude = coordinates.lat;
            const longitude = coordinates.lng;

            return { latitude, longitude };
        } else {
            console.error(`Error fetching coordinates: ${data.status}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return null;
    }
}

