'use babel';

import { allowUnsafeEval, allowUnsafeNewFunction } from 'loophole';
import GitHelper from './GitHelper';
import IEditor = AtomCore.IEditor;
import NodeColorGradient from 'node-color-gradient';

let editors: { [prop: string]: IEditor } = {};
let datePromises: { [prop: string]: Promise<Date> } = {};
let cachedGradients: { [prop: string]: Array<number[]> } = {};

export async function colorScale(editor: IEditor) {
  const projectDir = await GitHelper.getRepoRootPath(editor.getPath());
  if (cachedGradients[projectDir]) {
    return cachedGradients[projectDir];
  }
  let firstCommitDate: Date = await datePromises[projectDir];
  const totalDays = (((Date.now() - firstCommitDate.getTime()) / 1000) / 3600) / 24;
  const gradient = calculateScale(totalDays);
  cachedGradients[projectDir] = gradient;
  return gradient;
}

export function setEditor(editor: IEditor){
  return GitHelper.getRepoRootPath(editor.getPath()).then((projectDir) => {
    if(editors[projectDir]){
      return;
    }
    editors[projectDir] = editor;
    datePromises[projectDir] = GitHelper.getFirstCommitDateForRepo(projectDir);
  });
}

function calculateScale(steps: number) {
  return new NodeColorGradient([
    [63, 116, 212],
    [60, 125, 199],
    [55, 136, 228],
    [78, 161, 216],
    [83, 175, 202],
    [96, 202, 197],
    [127, 225, 221],
    [167, 239, 236],
    [203, 248, 247],
    [255, 255, 255],
    [253, 245, 234],
    [251, 231, 204],
    [246, 208, 158],
    [243, 179, 99],
    [240, 159, 96],
    [240, 141, 89],
    [239, 128, 88],
    [238, 115, 73],
    [237, 98, 59],
    [235, 62, 37],
  ]).getGradient(steps);
}
