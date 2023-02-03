'use strict'

const API_STR = "https://kontests.net/api/v1"

const ALL_SITES = new Set();
const ALL_SITES_CONTEST = new Map();
let data = new Array();

const fetchingDataOnLoad = fetch(API_STR+"/all")
.then(r=>r.json())
.then(data => data);

function putDataInMap(el,count){
    let obj = {}
    obj["count"] = count;
    // if(el.in_24_hours === "Yes"){
    //     if(ALL_SITES_CONTEST[el.site].in_24_hours !== null){
    //         console.log("Yes it has")
    //     }else{
    //         obj["in_24_hours"] = 1;
    //     }
    // }else{
    //     (ALL_SITES_CONTEST[el.site]?.in_24_hours === undefined) ? "" :obj["in_24_hours"] = 0;
    // }
    ALL_SITES_CONTEST.set(el.site,obj);

    
}

function countIn24Hours(data){
    const arr = []

    data.map(el => el.in_24_hours === "Yes" ? arr.push(el) : null);
    
    arr.map(el => {
        let obj = ALL_SITES_CONTEST.get(el.site)
        obj.in_24_hours = 1;
        ALL_SITES_CONTEST.set(el.site,obj)
    });

}

window.onload = async () => {
    data = await fetchingDataOnLoad;
    
    data.map(el => {
        ALL_SITES.add(el.site)
        ALL_SITES_CONTEST.get(el.site) ? putDataInMap(el,++ALL_SITES_CONTEST.get(el.site).count) : putDataInMap(el,1);        
    });

    countIn24Hours(data);

    console.log(ALL_SITES_CONTEST)
  
};