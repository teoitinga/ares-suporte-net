import { tbl_conversao, tubulacao } from "./tubulacao.model";

export const TUBOS: tubulacao[] = [
    {descricao: 'Tubo PVC soldável DN 25 PN 60', dn: 25, di: 22.4, material: 'PVC', k: 140},
    {descricao: 'Tubo PVC soldável DN 32 PN 60', dn: 32, di: 27.8, material: 'PVC', k: 140},
    {descricao: 'Tubo PVC soldável DN 40 PN 60', dn: 40, di: 38.08, material: 'PVC', k: 140},
    {descricao: 'Tubo PVC soldável DN 50 PN 60', dn: 50, di: 44.0, material: 'PVC', k: 140},
    {descricao: 'Tubo PVC soldável DN 75 PN 60', dn: 75, di: 70.04, material: 'PVC', k: 140},
]
export const TBL_CONV: tbl_conversao[] = [
    {numSaidas: 1, fator: 1},
    {numSaidas: 2, fator: 0.634},
    {numSaidas: 3, fator: 0.528},
    {numSaidas: 4, fator: 0.48},
    {numSaidas: 5, fator: 0.451},
    {numSaidas: 6, fator: 0.433},
    {numSaidas: 7, fator: 0.419},
    {numSaidas: 8, fator: 0.41},
    {numSaidas: 9, fator: 0.402},
    {numSaidas: 10, fator: 0.396},
    {numSaidas: 12, fator: 0.388},
    {numSaidas: 14, fator: 0.381},
    {numSaidas: 16, fator: 0.379},
    {numSaidas: 18, fator: 0.378},
    {numSaidas: 20, fator: 0.376},
    {numSaidas: 22, fator: 0.374},
    {numSaidas: 24, fator: 0.372},
    {numSaidas: 26, fator: 0.37},
    {numSaidas: 28, fator: 0.369},
    {numSaidas: 30, fator: 0.368},
    {numSaidas: 31, fator: 0.36},
]
