export default class FileService {
    static encode(path) {
        // [경선식] 등 특수문자 완벽 대응을 위한 인코딩
        return path.split('/').map(p => encodeURIComponent(p)).join('/');
    }
}