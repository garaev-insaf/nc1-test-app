export type NewsType = {
    userId: number,
    id: number,
    title: string,
    body: string,
}

type ProfileAddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string,
    }
}

type ProfileCompanyType = {
    name: string,
    catchPhrase: string,
    bs: string,
}

export type ProfileType = {
    id: number | null,
    name: string,
    username: string,
    email: string,
    address: ProfileAddressType,
    phone: string,
    website: string,
    company: ProfileCompanyType,
}