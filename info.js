const countryCodeMap = {
    // Tiếng Việt
    "Việt Nam": "VIE", "Nhật": "JPN", "Nhật Bản": "JPN", "Hàn": "KOR", "Hàn Quốc": "KOR",
    "Thái": "THA", "Thái Lan": "THA", "Trung": "CHN", "Trung Quốc": "CHN",
    // Tiếng Anh
    "Vietnam": "VIE", "Japan": "JPN", "South Korea": "KOR", "Thailand": "THA", "China": "CHN",
    "United States": "USA", "USA": "USA", "Germany": "GER", "Italy": "ITA", "France": "FRA",
    "UK": "ENG", "England": "ENG", "Malaysia": "MAS", "Indonesia": "IDN",
    "Brazil": "BRA", "Mexico": "MEX", "India": "IND"
  };

  function normalizeOriginKey(origin) {
    return origin.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function getCountryCode(origin) {
    const key = normalizeOriginKey(origin);
    for (const [name, code] of Object.entries(countryCodeMap)) {
      if (normalizeOriginKey(name) === key) return code;
    }
    return "UNK";
  }

  function generateCarCodeFromInput(origin, inputCode) {
    const prefix = getCountryCode(origin);
    const paddedCode = inputCode.toString().padStart(3, '0');
    return `${prefix}-${paddedCode}`;
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`✅ Đã sao chép mã: ${text}`);
    }).catch(err => {
      alert("❌ Lỗi khi sao chép");
      console.error('Không thể sao chép', err);
    });
  }

  function showCarInfo(name, scale, condition, origin, additionalInfo = '', quantity = 1, originalPrice = 'Chưa định giá', price = 'Chưa định giá', inputCode = '') {
    const code = generateCarCodeFromInput(origin, inputCode);

    const modalBody = document.getElementById("carModalContent");
    modalBody.innerHTML = `
      <div style="color: #1e3f3f; font-family:'Space Mono';">
        <strong>Tên xe:</strong> ${name}<br>
        <strong>Tỉ lệ:</strong> ${scale}<br>
        <strong>Tình trạng:</strong> ${condition}<br>
        <strong>Sản xuất tại:</strong> ${origin}<br>
        <strong>Thông tin phụ:</strong> ${additionalInfo || 'Không có thông tin'}<br>
        <strong>Số lượng:</strong> ${quantity || 1}<br>
      <strong>Giá gốc:</strong> ${(originalPrice && originalPrice.trim() !== '') ? originalPrice + '.VND' : '0.VND'}<br>
        <strong>Giá:</strong> ${(price && price.trim() !== '') ? price + '.VND' : '0.VND'}<br>
        <strong>Mã số:</strong> <span id="carCodeText">${code}</span>
        <button onclick="copyToClipboard('${code}')" style="margin-left: 8px;" class="btn btn-sm btn-outline-dark">
          <i class="bi bi-clipboard-fill"></i> Sao chép
        </button>
      </div>
    `;

    const myModal = new bootstrap.Modal(document.getElementById('carInfoModal'));
    myModal.show();
  }