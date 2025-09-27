async function printReceipt(content) {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'D35' }],
      optionalServices: ['49535343-fe7d-4ae5-8fa9-9fafd205e455']
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('49535343-fe7d-4ae5-8fa9-9fafd205e455');
    const characteristic = await service.getCharacteristic('49535343-8841-43f4-a8d4-ecbe34729bb3');

    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    await characteristic.writeValue(data);

    alert("✅ 蓝牙打印成功！");
  } catch (error) {
    alert("❌ 打印失败：" + error.message);
  }
}
