const inquirer = require('inquirer')
const util = require('util')
const fs = require('fs')
const writeFileP = util.promisify(fs.writeFile)
const appendFileP = util.promisify(fs.appendFile)
const request = require('request');
const axios = require('axios');
const async = require('async')
  

//**if (codeBadge === nodeJS) {
//console.log('nodeJS')}
//switch  (codeBadge === javascript){
 // console.log('javacsript')}
  //elseif (codeBadge === html){
  //console.log('html')}
  //elseif (codeBadge === css){
  //console.log('css')}
  //else{
  //console.log('other')
//} 


  
  
getGitHubUser()
  .then(function (answers) {
    const md = generateREADME(answers)
    return appendFileP('readme.md', md)
    console.log (answers.User)
    //console.log (answers.userGitHub2)
    
  })
  .then(function () {
    
    console.log('Successfully wrote to readme.md')
    //console.log(avatarurl)
    promptUser()
    
    .then(function (answers2) {

      const html = generateHTML(answers2)
      return appendFileP('readme.md', html)
    })
    .then(function () {
      
      console.log('Successfully wrote to index.html')
    })
    .catch(function (err) {
      console.error(err)
    })
    //console.log(userGitHub)
  })
  
  .catch(function (err) {
    console.error(err)
  })
  
  

  //const md3 = generateREADME3(answers3)
  //return appendFileP('readme.md', md)
  //console.log (answers.User)
  //console.log (answers.userGitHub2)

  function generateREADME (answers) {
    
    return `
    ##Here is the github username ${answers.User}
  
    `  
  
  
  }  
  //##Here is the avatar url ${answers.avatar_url}
async function getGitHubUser () {
  try {
      const userGitHub = await inquirer.prompt({
      message: 'Enter GitHub Username:',
      name: 'User'
      
      })
      const badge2 = await inquirer.prompt({
        type: 'input',
        name: 'codeBadge',
        message: 'What language was the code written in?'
      
      })
      if (badge2.codeBadge === 'nodeJS') {
        writeFileP('readme.md', '![alt text](https://img.shields.io/badge/build-nodeJS-brightgreen)' + '\n')
      } else if (badge2.codeBadge ==='javascript'){
        writeFileP('readme.md', '![alt text](https://img.shields.io/badge/build-javascript-green)' + '\n')        } 
        else if (badge2.codeBadge ==='html'){
          writeFileP('readme.md', '![alt text](https://img.shields.io/badge/build-html-yellowgreen)' + '\n')
      } else if (badge2.codeBadge ==='css'){
        writeFileP('readme.md', '![alt text](https://img.shields.io/badge/build-css-yellow)' + '\n')
      } else {
        writeFileP('readme.md', '![alt text](https://img.shields.io/badge/build-other%20-orange)' + '\n')
      }
      const response = await axios.get(
      
        `https://api.github.com/users/${userGitHub.User}`  
        
        )
        const id = response.data.id 
        console.log(id)
        const avatarurl = '![alt text](' + 'https://avatars0.githubusercontent.com/u/'+ id + '?v=4)'
        console.log (avatarurl)
        appendFileP('readme.md', avatarurl + '\n')
        appendFileP('readme.md', 'https://img.shields.io/gitter/room/mrmikehoyt/hw3demo' + '\n')
        //return response.data.avatar_url
       //const id =  response.query.id; // $_GET["id"]
      //console.log (response.data.id)
      
       return userGitHub
      //return userGitHub2
        //console.log(userGitHub)  
      //return response.data.avatarurl
//            return getGitHubUser
      //return title
    
        
    } catch (err) {
      console.log(err)
      
    }
    //return (response.data.avatar_url)  
    //return response
    }
  
   
    
    
  
  function promptUser () {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title?'
      },
      
      {
        type: 'input',
        name: 'description',
        message: 'What is the description?'
      },
      {
        type: 'input',
        name: 'tableOfContents',
        message: 'What is the table of contents?'
      },
      {
        type: 'input',
        name: 'usage',
        message: 'What is the usage of the application?'
      },
      {
        type: 'input',
        name: 'license',
        message: 'What is the license'
      },
      {
        type: 'input',
        name: 'contributing',
        message: 'Who helped.'
      }
    ])
  }

  
  
  function generateHTML (answers2) {
    return `
    
    #Here is the title  ${answers2.title}
    ##Here is the descriptoin ${answers2.description}
    ##Here is the table of contents ${answers2.tableOfContents}
    ##Here is the usage of the applicatoin ${answers2.usage}
    ##Here is the license ${answers2.license}
    ##Here is who helped ${answers2.contributing}
    ##Here are the tests performed ${answers2.tests}
    ##Here are the questions${answers2.questions}  
     
    `
  }
        
      
  async function badge () {
    try {
        const badge2 = await inquirer.prompt({
          type: 'input',
          name: 'codeBadge',
          message: 'What language was the code written in?'
        
        })
        
        if (badge2 === 'nodeJS') {
          appendFileP('readme.md', 'nodejs' + '\n')
        } else if (badge2 ==='javascript'){
          appendFileP('readme.md', 'javascript' + '\n')        } 
          else if (badge2 ==='html'){
            appendFileP('readme.md', 'html' + '\n')
        } else if (badge2 ==='css'){
          appendFileP('readme.md', 'css' + '\n')
        } else {
          appendFileP('readme.md', 'other' + '\n')
        }
          //const id = response.data.id 
          //console.log(id)
          //const avatarurl = '![alt text](' + 'https://avatars0.githubusercontent.com/u/'+ id + '?v=4)'
          //console.log (avatarurl)
         
          //appendFileP('readme.md', 'https://img.shields.io/gitter/room/mrmikehoyt/hw3demo' + '\n')
          //return response.data.avatar_url
         //const id =  response.query.id; // $_GET["id"]
        //console.log (response.data.id)
        
                 //return userGitHub2
          //console.log(userGitHub)  
        //return response.data.avatarurl
  //            return getGitHubUser
        //return title
      
          
      } catch (err) {
        console.log(err)
        
      }
      //return (response.data.avatar_url)  
      //return response
      }