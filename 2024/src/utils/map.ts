export class AocMap {
    private data: string[][];

    constructor(data: string) {
        this.data = data.split('\n').map(l => l.split(''));
    }

    get values(): string[][] {
        return this.data;
    }

    get rows() {
        return this.data.length;
    }

    get columns() {
        return this.data[0].length;
    }

    get(x: number, y: number) {
        return this.data[y][x];
    }

    set(x: number, y: number, value: string) {
        this.data[y][x] = value;
    }

    toString() {
        return this.data.map(row => row.join('')).join('\n');
    }

    insertRow(rowIndex: number, value: string) {
        this.data.splice(rowIndex, 0, Array(this.columns).fill(value));
    }

    insertRows(rowIndex: number, value: string, rows: number) {
        for (let r = 1; r < rows; r++) {
            this.insertRow(rowIndex, value);
        }
    }

    insertColumn(columnIndex: number, value: string) {
        for (let r = 0; r < this.rows; r++) {
            this.data[r].splice(columnIndex, 0, value);
        }
    }

    insertColumns(columnIndex: number, value: string, columns: number) {
        for (let c = 1; c < columns; c++) {
            this.insertColumn(columnIndex, value);
        }
    }
}