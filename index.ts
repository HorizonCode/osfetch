import { getLogo } from "./logoFactory";
import * as config from './config.json';
import * as si from "systeminformation";
import ansiStyles from "./vendor/ansi-styles";
import os from 'os';

(async () => {
    const osInfo = await si.osInfo();
    const cpuInfo = await si.cpu();
    const gpuInfo = await si.graphics();
    const memInfo = await si.mem();
    const diskInfo = await si.fsSize();

    const logoAscii = getLogo("arch");
    const configLinesArray = config.lines;
    const maxLines = Math.max(logoAscii.length, configLinesArray.length);
    for (let index = 0; index < maxLines; index++) {
        const asciiLine = logoAscii[index] ? logoAscii[index] : "";
        let infoLine = configLinesArray[index] ? configLinesArray[index] : "";
        infoLine = infoLine.replace(/\[os:(.*?)\]/g, (match, field) => {
            if (field in osInfo) {
                return osInfo[field];
            }
            return match;
        });
        infoLine = infoLine.replace(/\[uptime\]/g, secondsHumanReadable(Math.floor(os.uptime())));
        infoLine = infoLine.replace(/\[cpu\]/g, `${cpuInfo.manufacturer} ${cpuInfo.brand} (${cpuInfo.cores}) @ ${cpuInfo.speedMax.toFixed(3)}GHz`);
        infoLine = infoLine.replace(/\[mem:(.*?)\]/g, (match, field) => {
            if (field in memInfo) {
                if (Number.isInteger(memInfo[field]))
                    return formatBytes(memInfo[field], 2);
                return memInfo[field];
            }
            return match;
        });
        if (diskInfo.length > 0) {
            const bootDisk = diskInfo[0];
            infoLine = infoLine.replace(/\[disk:(.*?)\]/g, (match, field) => {
                if (field in bootDisk) {
                    if (Number.isInteger(bootDisk[field]))
                        return formatBytes(bootDisk[field], 2);
                    return bootDisk[field];
                }
                return match;
            });
        }
        if (gpuInfo.controllers.length > 0) {
            const firstGPU = gpuInfo.controllers[0];
            infoLine = infoLine.replace(/\[gpu:(.*?)\]/g, (match, field) => {
                if (field in firstGPU) {
                    return firstGPU[field];
                }
                return match;
            });
        }
        infoLine = infoLine.replace(/\[colorTest\]/g, `${ansiStyles.red.open}󰣐 ${ansiStyles.green.open}󰣐 ${ansiStyles.yellow.open}󰣐 ${ansiStyles.blue.open}󰣐 ${ansiStyles.magenta.open}󰣐 ${ansiStyles.cyan.open}󰣐 ${ansiStyles.white.open}󰣐 ${ansiStyles.grey.open}󰣐`);
        infoLine = infoLine.replace(/\{color:(.*?)\}/g, (match, color) => {
            if (color in ansiStyles)
                return ansiStyles[color].open;
            return match;

        });
        if (asciiLine.length <= 0) {
            const lastLine = logoAscii[logoAscii.length - 1].replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
            infoLine = lastLine.replace(/./g, " ") + infoLine;
        }
        console.log(asciiLine + infoLine);
    }
    console.log(ansiStyles.reset.open);
})();

function secondsHumanReadable(seconds: number): string {
    let dateString = "";
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

    if (numyears > 0)
        dateString = `${numyears} year${numyears > 1 ? 's' : ''} `;
    if (numdays > 0)
        dateString += `${numdays} day${numdays > 1 ? 's' : ''} `;
    if (numhours > 0)
        dateString += `${numhours} hour${numhours > 1 ? 's' : ''} `;
    if (numminutes > 0)
        dateString += `${numminutes} minute${numminutes > 1 ? 's' : ''} `;
    if (numseconds > 0)
        dateString += `${numseconds} second${numseconds > 1 ? 's' : ''} `;

    return dateString.trim();

}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}