class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    has_many :sboms
    # attr_accessor :netid
    validates :netid, presence: true
end
