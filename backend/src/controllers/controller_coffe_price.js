import axios from 'axios';
import * as cheerio from 'cheerio';

const formatearCOP = (valor) => `$${valor.toLocaleString('es-CO')}`;

export const obtenerPrecioFNC = async (req, res) => {
  try {
    const url = 'https://caldas.federaciondecafeteros.org/glosario/precio-interno-de-compra-de-cafe/';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);

    const match = $('body').text().match(/Precio interno de referencia:\s*\$([\d\.]+)/);
    if (!match) {
      return res.status(500).json({ mensaje: 'No se encontró el precio en la página (Caldas)' });
    }

    const precio = parseInt(match[1].replace(/\./g, ''));
    if (isNaN(precio)) {
      return res.status(500).json({ mensaje: 'Precio interno no válido (Caldas)' });
    }

    return res.json({
      departamento: 'Caldas',
      precio_cop_por_carga: precio,
      precio_formateado: formatearCOP(precio),
      fuente: url,
      fecha: new Date().toISOString().split('T')[0],
    });
  } catch (err) {
    console.error('Error extrayendo precio Caldas:', err.message);
    res.status(500).json({ mensaje: 'Error interno extrayendo precio Caldas' });
  }
};

export const obtenerPrecioCafeHuila = async (req, res) => {
  try {
    const url = 'https://huila.federaciondecafeteros.org/glosario/precio-interno-de-compra-de-cafe/';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);

    const match = $('body').text().match(/Precio interno de referencia:\s*\$([\d\.]+)/);
    if (!match) {
      return res.status(500).json({ mensaje: 'No se encontró el precio en la página (Huila)' });
    }

    const precio = parseInt(match[1].replace(/\./g, ''));
    if (isNaN(precio)) {
      return res.status(500).json({ mensaje: 'Precio interno no válido (Huila)' });
    }

    return res.json({
      departamento: 'Huila',
      precio_cop_por_carga: precio,
      precio_formateado: formatearCOP(precio),
      fuente: url,
      fecha: new Date().toISOString().split('T')[0],
    });
  } catch (error) {
    console.error('Error extrayendo precio Huila:', error.message);
    return res.status(500).json({ mensaje: 'Error interno extrayendo precio Huila' });
  }
};
