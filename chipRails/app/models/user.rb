class User < ApplicationRecord
    has_many :sboms, dependent: :nullify
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    # attr_accessor :netid
    validates :netid, presence: true
end
