import { mockFetchHelper } from "./mock_api";
const raw_albums = require('./albums.json');
import 'regenerator-runtime/runtime'

async function readAlbums() {
    const table = await mockFetchHelper(true, raw_albums);
    createTable(table)
}

function createTable(data) {
    let table = document.getElementById('album-table')
    let count = Object.keys(data.albums).length

    data.albums.sort(function(a,b){return b.last_listened - a.last_listened})

    for (let i=0; i<count; i++){
        let date = new Date(data.albums[i].last_listened)

        let row = `<tr>
                        <td>${data.albums[i].band_name}</td>
                        <td>${data.albums[i].album_title}</td>
                        <td>${data.albums[i].genres}</td>
                        <td>${((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))
                                +"/"+(date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
                                +"/"+date.getFullYear()
                                +" "+(date.getHours() < 10 ? '0'+date.getHours() : date.getHours())
                                +":"+(date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes())+" am"}
                        </td>
                        <td>${reverseDate(data.albums[i].release_date)}</td>
                    </tr>`

        table.innerHTML += row
    }
}

function reverseDate(date) {
    let split = date.split("/")
    let reverse = split[1]+"/"+split[2]+"/"+split[0]
    return reverse
}

readAlbums()