
export const generateLeftItems = (history) => ({
    header: "VCB - iB@nking của tôi",
    items: [
        {icon: "menu-home", label: "Trang chủ"},
        {icon: "menu-thongtintaikhoan", label: "Thông tin Tài khoản/ Thẻ", sub: {
            header: "Thông tin Tài khoản/ Thẻ",
            items: [
                {label: "Tài khoản", sub: {
                    header: "Tài khoản",
                    items: [
                        {label: "Danh sách tài khoản", onClick: () => history.push("/account-list")}
                    ]
                }},
                {label: "Thẻ"},
            ]
        }},
        {icon: "menu-chuyentien", label: "Chuyển tiền", sub: {
            header: "Chuyển tiền",
            items: [
                {label: "Chuyển tiền trong Vietcombank"},
                {label: "Chuyển tiền tới ngân hàng khác", onClick: () => history.push("/transfer-external")},
            ]
        }},
        {icon: "menu-thanhtoan", label: "Thanh toán"},
        {icon: "menu-tietkiemtructuyen", label: "Tiết kiệm trực tuyến"},
        {icon: "menu-tienichgiatang", label: "Tiện ích gia tăng"},
        {icon: "menu-hotrogiaodich", label: "Hỗ trợ giao dịch"},
        {icon: "menu-call", label: "Dịch vụ khách hàng 24/7"},
    ]
});