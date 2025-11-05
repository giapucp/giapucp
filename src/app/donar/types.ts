export type Donacion = {
  nombre: string;
  monto: number | string | null;
};

export type DonacionesResponse = {
  meta?: { source?: string; sheetId?: string; gid?: string; rows?: number };
  data: Donacion[];
};
