<img src=https://github.com/RFbkak37y3kIY/webshark/assets/1423657/e769fcbf-d83b-4d07-8e86-c9b5706ad5ee width=180>

# webshark-ui

_User-Interface builder for [**webShark**](https://github.com/QXIP/webshark), a *Wireshark-like* webapp_ 🕵️

<img src="https://github.com/QXIP/webshark/assets/1423657/092c2544-f5db-4a79-b3da-d48df4e0813c" width=600 />

---

## URL Parameters

This application requires a `file` parameter to open a pcap file directly. The file list page has been removed.

### Usage

**Open a file:**
```
http://localhost:4200/?file=myfile.pcap
```

**Open a file in a directory:**
```
http://localhost:4200/?file=directory/subdirectory/myfile.pcap
```

**Open a file with a default filter:**
```
http://localhost:4200/?file=myfile.pcap&filter=ip.src == "192.168.1.1"
```

### Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `file` | Path to the pcap file (required) | `file=capture.pcap` |
| `filter` | Wireshark display filter to apply | `filter=sip.Via.received == "10.0.0.1"` |

---

## Changes from Original

- **File parameter required**: The application now requires a `file` query parameter to open a pcap file
- **Filter parameter**: Added support for `filter` query parameter to apply a default display filter
- **Removed file list page**: The file browser/upload page has been removed
- **Local fonts**: Fonts (Roboto, Material Icons) are now loaded locally instead of from Google Fonts
- **Loading screen**: Added a loading indicator that shows until data is ready

---

### Latest Distribution
```
wget github.com/qxip/webshark-ui/releases/latest/download/latest.zip
```

### License
Released under the AGPLv3 License.<br>
Copyright by QXIP BV, Some rights Reserved.
