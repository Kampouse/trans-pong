import * as bcrypt from 'bcrypt';

export async function hashPwd(rawPwd: string) {
    const SALT = await bcrypt.genSalt();
    return bcrypt.hash(rawPwd, SALT);
}

export async function comparePwd(rawPwd: string, hashPwd: string) {
    return bcrypt.compare(rawPwd, hashPwd);
}