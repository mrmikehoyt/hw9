const inquirer = require('inquirer')
const util = require('util')
const fs = require('fs')
const writeFileP = util.promisify(fs.writeFile)
const appendFileP = util.promisify(fs.appendFile)
const request = require('request');
const axios = require('axios');
const async = require('async')







getGitHubUserandBadge()
  .then(function (answers) {
    const md = generateREADME(answers)
    return appendFileP('readme.md', md)
    
    
  })
  .then(function () {

    
    
    promptUser()

      .then(function (answers2) {

        const md3 = generateMD(answers2)
        return appendFileP('readme.md', md3)
      })
      .then(function () {

        console.log('Successfully wrote to readme.md')
      })
      .catch(function (err) {
        console.error(err)
      })
    
  })

  .catch(function (err) {
    console.error(err)
  })





function generateREADME(answers) {

  return `
    ##Here is the github username ${answers.User}
  
    `


}
async function getGitHubUserandBadge() {
  try {
    const userGitHub = await inquirer.prompt({
      message: 'Enter GitHub Username:',
      name: 'User'

    })
    const badge2 = await inquirer.prompt({
      type: 'input',
      name: 'codeBadge',
      message: 'What language was the code written in? (nodeJS, javascript,html,css,other)'

    })
    if (badge2.codeBadge === 'nodeJS') {
      writeFileP('readme.md', '\n' + '![alt text](https://img.shields.io/badge/build-nodeJS-brightgreen)' + '\n')
    } else if (badge2.codeBadge === 'javascript') {
      writeFileP('readme.md', '\n' + '![alt text](https://img.shields.io/badge/build-javascript-green)' + '\n')
    } else if (badge2.codeBadge === 'html') {
      writeFileP('readme.md', '\n' + '![alt text](https://img.shields.io/badge/build-html-yellowgreen)' + '\n')
    } else if (badge2.codeBadge === 'css') {
      writeFileP('readme.md', '\n' + '![alt text](https://img.shields.io/badge/build-css-yellow)' + '\n')
    } else {
      writeFileP('readme.md', '\n' + '![alt text](https://img.shields.io/badge/build-other%20-orange)' + '\n')
    }
    const response = await axios.get(

      `https://api.github.com/users/${userGitHub.User}`

    )
    const id = response.data.id
    const avatarurl = '![alt text](' + 'https://avatars0.githubusercontent.com/u/' + id + '?v=4)'
    appendFileP('readme.md', avatarurl + '\n')


    return userGitHub



  } catch (err) {
    console.log(err)

  }

}





function promptUser() {
  return inquirer.prompt([{
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
      type: 'editor',
      name: 'tableOfContents',
      message: 'What is the table of contents?'
    },
    {
      type: 'editor',
      name: 'installation',
      message: 'Describe the installation'
    },
    {
      type: 'editor',
      name: 'usage',
      message: 'What is the usage of the application?'
    },
    {
      type: 'input',
      name: 'license',
      message: 'What is the license if any?'
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Who helped?'
    },
    {
      type: 'editor',
      name: 'tests',
      message: 'What tests were performed?'
    },
    {
      type: 'editor',
      name: 'questions',
      message: 'What questions were asked?'
    }

  ])
}



function generateMD(answers2) {
  return `
    
    #Here is the title \n  ${answers2.title}
    ##Here is the description \n ${answers2.description}
    ##Here is the table of contents \n ${answers2.tableOfContents}
    ##Here are the installation steps \n${answers2.installation}
    ##Here is the usage of the application \n ${answers2.usage}
    ##Here is the license \n ${answers2.license}
    ##Here is who helped \n ${answers2.contributing}
    ##Here are the tests performed \n ${answers2.tests}
    ##Here are the questions \n ${answers2.questions}  
     
    `
}