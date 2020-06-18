pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;


contract Houses {
    constructor() public {}

    struct House {
        string propietario;
        address walletPropietario;
        string curp;
        string fecha;
        string escritura;
        string notaria;
        address walletNotario;
        string solicitud;
        string ubicacion;
        string[] locationData;
    }

    House[] public houses;

    mapping (uint => address) public houseToOwner;

    function createHouse(
        string memory _propietario,
        address _walletPropietario,
        string memory _curp,
        string memory _fecha,
        string memory _escritura,
        string memory _notaria,
        address _walletNotario,
        string memory _solicitud,
        string memory _ubicacion,
        string[] memory _locationData
    ) public {
        uint id = houses.push(House(
        _propietario,
        _walletPropietario,
        _curp,
        _fecha,
        _escritura,
        _notaria,
        _walletNotario,
        _solicitud,
        _ubicacion,
        _locationData
        )) - 1;
        houseToOwner[id] = _walletPropietario;
    }

    function editHouse(
        uint _index,
        string memory _propietario,
        address _walletPropietario,
        string memory _curp,
        string memory _fecha,
        string memory _escritura,
        string memory _notaria,
        address _walletNotario,
        string memory _solicitud,
        string memory _ubicacion,
        string[] memory _locationData
    ) public {
        House storage myHouse = houses[_index];
        myHouse.propietario = _propietario;
        myHouse.walletPropietario = _walletPropietario;
        myHouse.curp = _curp;
        myHouse.fecha = _fecha;
        myHouse.escritura = _escritura;
        myHouse.notaria = _notaria;
        myHouse.walletNotario = _walletNotario;
        myHouse.solicitud = _solicitud;
        myHouse.ubicacion = _ubicacion;
        myHouse.locationData = _locationData;
    }

    function getAll() public view returns(House[] memory) {
        return houses;
    }
}