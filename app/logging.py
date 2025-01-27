import logging
import os

def setup_logging(log_file="static/logs/app.log"):
    """
    Mengatur logging untuk aplikasi.
    
    Args:
        log_file (str): Path ke file log.
    
    Returns:
        None
    """
    # Pastikan folder untuk file log ada
    log_dir = os.path.dirname(log_file)
    os.makedirs(log_dir, exist_ok=True)

    # Konfigurasi logging
    logging.basicConfig(
        filename=log_file,  # Nama file log
        level=logging.INFO,  # Level logging (INFO, DEBUG, ERROR, dll.)
        format="%(asctime)s - %(levelname)s - %(message)s"  # Format pesan log
    )

    # Tambahkan handler untuk output ke konsol (opsional)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
    logging.getLogger().addHandler(console_handler)

    logging.info("Logging berhasil diinisialisasi.")