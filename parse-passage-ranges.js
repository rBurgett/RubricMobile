const fs = require('fs-extra-promise');
const path = require('path');

const chapterPatt = /^([^-]+?)\s(\d+)$/;
const multipleChapterPatt = /^([^-]+?)\s(\d+)-(\d+)$/;
const versePatt = /^([^-]+?)\s(\d+):(\d+)-(\d+)$/;
const singleVersePatt = /^([^-]+?)\s(\d+):(\d+)$/;
const chapterVersePatt = /^([^-]+?)\s(\d+):(\d+)-(\d+):(\d+)$/;

const patts = [
  chapterPatt,
  versePatt,
  singleVersePatt,
  chapterVersePatt,
  multipleChapterPatt
];

(async function() {
  try {

    // const data = await fs.readJsonAsync(path.join(__dirname, 'daily-readings.json'));
    //
    // const allPassages = Object.keys(data)
    //   .reduce((arr, key) => arr.concat(data[key]), [])
    //   .filter(ref => !patts.some(p => p.test(ref)));
    //   // .filter(ref => singleVersePatt.test(ref));
    //
    // console.log(allPassages);

    const textArr = [
      'export default {'
    ];

    const dir = path.join(__dirname, 'bible');
    const files = fs.readdirSync(dir);
    for(const file of files) {
      textArr.push(`  '${path.basename(file, '.json').replace(/_/g, ' ')}': () => require('../../bible/${file}'),`);
    }
    textArr.push('};');
    textArr.push('\n');
    const text = textArr.join('\n');
    console.log(text);
    fs.writeFileSync(path.join('src', 'modules', 'bible.js'), text, 'utf8');
    //   const jsFileName = path.basename(file, '.json') + '.js';
    //   const text = [
    //     `import data from '../../../bible/${file}';`,
    //     'export default data;',
    //     ''
    //   ];
    //   fs.writeFileSync(path.join('src', 'modules', 'bible', jsFileName), text.join('\n'), 'utf8');
      // const newFileName = file.replace(/^\d+?-/, '');
      // console.log(newFileName);
      // fs.moveSync(path.join(dir, file), path.join(dir, newFileName));
    // const textArr = [
    //   'export default {'
    // ];
    // const dir = path.join(__dirname, 'src', 'modules', 'bible');
    // const files = fs.readdirSync(dir);
    // for(const file of files) {
    //   textArr.push(`  '${path.basename(file, '.js').replace(/_/g, ' ')}: require('../../../bible/${}')`)
    // }

  } catch(err) {
    console.error(err);
  }
})();
