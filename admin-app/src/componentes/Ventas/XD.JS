const handleEliminarVenta = async (idVenta) => {
    
    const cargo = localStorage.getItem("cargo");
    if (cargo !== "Administrador") {
      Swal.fire({
        icon: "error",
        title: "Acceso Denegado",
        text: "Solo los administradores pueden eliminar ventas.",
      });
      return; 
    }
  
    
    const confirmar = await Swal.fire({
      title: "¿Estás completamente seguro?",
      text: "Esta acción eliminará la venta de forma permanente y no se puede deshacer.",
      icon: "warning",
      input: "text",
      inputPlaceholder: "Escribe CONFIRMA para continuar",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar definitivamente",
      cancelButtonText: "Cancelar",
      preConfirm: (inputValue) => {
        if (inputValue !== "CONFIRMA") {
          Swal.showValidationMessage(
            "Debes escribir 'CONFIRMA' para confirmar la eliminación"
          );
          return false;
        }
        return true;
      },
    });
  
    if (confirmar.isConfirmed) {
      try {
        
        const resultado = await eliminarVentaPorId(idVenta);
        Swal.fire({
          title: "Eliminada",
          text: resultado.mensaje,
          icon: "success",
        });
  
        
        setVentas(ventas.filter((venta) => venta._id !== idVenta));
      } catch (error) {
        console.error("Error al eliminar la venta:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la venta. Por favor, intente nuevamente.",
          icon: "error",
        });
      }
    }
  };