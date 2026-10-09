const SUPABASE_URL = "https://lafnqghrmyiuayazczkp.supabase.co";
const SUPABASE_KEY = "sb_publishable_pkwtletsazrh5ILO6DXkAA_EcZj4pJF";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
alert("Conectado con Supabase");

async function cargarClientes() {
  const { data, error } = await db
    .from("clientes")
    .select("*")
    .order("id_cliente", { ascending: true });

  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  if (error) {
    alert("Error al cargar clientes: " + error.message);
    return;
  }

  data.forEach((cliente) => {
    const li = document.createElement("li");
    li.textContent = `${cliente.nombre} - ${cliente.telefono || "sin teléfono"} - ${cliente.correo || "sin correo"}`;
    lista.appendChild(li);
  });
}

document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;

  const { error } = await db.from("clientes").insert([
    {
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      fecha_registro: new Date().toISOString().split("T")[0],
    },
  ]);

  if (error) {
    alert("Error al agregar cliente: " + error.message);
    return;
  }

  alert("Cliente guardado");
  e.target.reset();
  cargarClientes();
});

cargarClientes();
